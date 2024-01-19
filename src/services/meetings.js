import { request, methods } from '@/utils/request';

export const getMeetings = () => new Promise((resolve, reject) => {
    request(methods.get, '/api/meetings/', )
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
});
