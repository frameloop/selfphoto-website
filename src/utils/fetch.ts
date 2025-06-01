'use server'

interface FetchProps {
    apiVersion: '/api/v1/'
    endpoint: string
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
    body?: {
        [key: string]: string | number
    }
    params?: string[]
    revalidate?: number
}
interface Data {
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
    body?: string
    params?: string[]
    next?: { revalidate: number }
    headers: {
        'Content-type': 'application/json'
        authorization?: string | undefined
    }
}
// export const fetchApi = async ({ apiVersion, endpoint, method, body, revalidate = 0, params = [] }: FetchProps): Promise<Response> => {
export const fetchApi = async <T>({
    apiVersion,
    endpoint,
    method,
    body,
    revalidate = 0,
    params = []
}: FetchProps): Promise<T> => {
    let PARAMS

    if (params.length > 0 && Array.isArray(params)) {
        PARAMS = params.map(
            (param: string, index: number) =>
                `${index === 0 ? '?' : '&'}${param}`
        )
    }
    if (endpoint[0] === '/') {
        // endpoint = '/' + endpoint
        endpoint.substring(1)
    }
    const data: Data = {
        method,
        headers: {
            'Content-type': 'application/json'
        },
        next: { revalidate }
    }
    if (body !== undefined) {
        data.body = JSON.stringify(body)
    } else {
        data.body = JSON.stringify({})
    }
    // console.log('process.env.NEXT_PUBLIC_BASE_URL + apiVersion + endpoint',process.env.NEXT_PUBLIC_BASE_URL + apiVersion + endpoint + (params?.length > 0 ? PARAMS?.join('') : ''))
    const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
            apiVersion +
            endpoint +
            (params?.length > 0 ? PARAMS?.join('') : ''),
        data
    )

    return response.json()
}

// fetch(
//     process.env.NEXT_PUBLIC_BASE_URL + apiVersion + endpoint,
//     {
//         method,
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(body ?? {}),
//         next: { revalidate }
//     }

// )
