export function setInterceptors(instance) {
    instance.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            console.log(error);
            return Promise.reject(error);
        }
    )

    instance.interceptors.response.use(
        (config) => {
            return config;
        },
        (error) => {
            console.log(error);
            return Promise.reject(error);
        }
    )
}