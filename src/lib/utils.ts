import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { STRAPI_GRAPHQL_URL } from './constants'
import { print } from 'graphql'
import type { DocumentNode, TypedDocumentNode } from '@apollo/client'

// =================================================================================================
//                                       UTILITY
// =================================================================================================
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function wait(milliseconds: number) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    })
}

export function debounce<F extends (...args: any[]) => any>(
    mainFunction: F,
    delay: number
): (...args: Parameters<F>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null

    return function (...args: Parameters<F>) {
        if (timer !== null) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            mainFunction(...args)
        }, delay)
    }
}

export const setFocusToEnd = (element: HTMLInputElement) => {
    if (typeof element.value === 'string' && !!element.setSelectionRange) {
        setTimeout(() => {
            const end = element.value.length
            element.setSelectionRange(end, end)
        }, 0)
    }
}

// =================================================================================================
//                                     AUTH TOKEN
// =================================================================================================
export function getAuthToken(): string {
    // Implement the logic to retrieve your authentication token here
    return '76d001caeac6f918405dc2cf087c70faf8612c8ab29b53bd84dfe0c5ae8306eb20a0009e961f1c5d7a664e55af94b92bf6e5a4e785ae29d6041dc32c77416d956bb427500f37950926c43ad41c6729c7595f9ce4de01d1aa416d63ee06d594b5f749606f2e42fe56cd6f2cd5f420811fb11b27388eec4329484b9fe992e60c38'
}

// =================================================================================================
//                                     MANUAL GRAPHQL REQUEST
// =================================================================================================

// Define a type for the variables parameter if needed
export type Variables = {
    [key: string]: any
}

// Define a type for the GraphQL response data structure
export interface GraphQLResponse<T> {
    data: T
    errors?: Array<{ message: string }>
}

// export declare function useQuery<
//     TData = any,
//     TVariables extends OperationVariables = OperationVariables,
// >(
//     query: DocumentNode | TypedDocumentNode<TData, TVariables>,
//     options?: QueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>
// ): QueryResult<TData, TVariables>

export async function manualFetchGraphQL<V, TData>(
    rawQuery: DocumentNode | TypedDocumentNode<TData>,
    variables: V | undefined
): Promise<TData> {
    const query = print(rawQuery)
    const response = await fetch(STRAPI_GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
    }

    const jsonResponse = (await response.json()) as GraphQLResponse<TData>

    if (jsonResponse.errors) {
        throw new Error(
            jsonResponse.errors.map(error => error.message).join('\n')
        )
    }

    return jsonResponse.data
}

// =================================================================================================
//     Strapi response simplification
// =================================================================================================

function simplifyResponse<T extends ObjectType>(
    response: T
): SimpleResponse<T> {
    const entries = Object.entries(response).filter(([k]) => k !== '__typename')
    if (entries.length >= 2)
        throw new Error(
            'Cannot simplify a Strapi response that contains an object with more than one key'
        )
    return simplify(entries[0][1] as any)
}

function simplify<T extends ValidType>(value: T): SimpleType<T>
function simplify<T>(value: T) {
    if (Array.isArray(value)) return value.map(simplify)

    if (isPlainObject(value)) {
        if ('data' in value) return simplify(value.data)
        if ('attributes' in value) return simplify(value.attributes)
        return objectMap(value, simplify)
    }

    return value
}

function isPlainObject<
    O extends R | any,
    R extends Record<string | number | symbol, any>,
>(obj: O): obj is R {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        obj.constructor === Object &&
        Object.getPrototypeOf(obj) === Object.prototype
    )
}

interface Dictionary<T> {
    [key: string]: T
}

function objectMap<TValue, TResult>(
    obj: Dictionary<TValue>,
    valSelector: (val: TValue, obj: Dictionary<TValue>) => TResult,
    keySelector?: (key: string, obj: Dictionary<TValue>) => string,
    ctx?: Dictionary<TValue>
) {
    const ret = {} as Dictionary<TResult>
    for (const key of Object.keys(obj)) {
        if (key === '__typename') continue
        const retKey = keySelector
            ? keySelector.call(ctx || null, key, obj)
            : key
        const retVal = valSelector.call(ctx || null, obj[key], obj)
        ret[retKey] = retVal
    }
    return ret
}

type ValidType = UntouchedType | ObjectType | ArrayType

type UntouchedType =
    | boolean
    | number
    | string
    | symbol
    | null
    | undefined
    | bigint
    | Date
type ObjectType = { [key in string]?: ValidType }
type ArrayType = ValidType[]

type IsAny<T> = unknown extends T & string ? true : false

type SimpleType<T extends ValidType> =
    IsAny<T> extends true
        ? any
        : T extends UntouchedType
          ? T
          : T extends [...infer Ar extends ValidType[]]
            ? { [Index in keyof Ar]: SimpleType<Ar[Index]> }
            : T extends { [K in 'data']?: infer Ob extends ValidType }
              ? SimpleType<Ob>
              : T extends { [K in 'attributes']?: infer Ob extends ValidType }
                ? SimpleType<Ob>
                : T extends Omit<ObjectType, 'data' | 'attributes'>
                  ? {
                        [key in Exclude<keyof T, '__typename'>]: SimpleType<
                            T[key]
                        >
                    }
                  : T

type IsUnion<T, U extends T = T> = (
    T extends any ? (U extends T ? false : true) : never
) extends false
    ? false
    : true
type GetOnlyKeyOrNever<
    T extends ObjectType,
    Keys = Exclude<keyof T, '__typename'>,
> = IsUnion<Keys> extends true ? never : Keys

type SimpleResponse<T extends ObjectType> = SimpleType<T[GetOnlyKeyOrNever<T>]>
type NonNullableItem<T extends any[] | null | undefined> = NonNullable<
    NonNullable<T>[number]
>

export {
    simplifyResponse,
    simplify,
    type SimpleType,
    type SimpleResponse,
    type NonNullableItem,
}
