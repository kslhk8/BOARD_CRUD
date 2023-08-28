import { fetchResponse } from './fetch'
// interface ResultType {
//   item: any;
//   error: boolean;
//   msg: string;
//   cursor?: number | null;
//   totalPage: number;
//   totalCount: number;
// }

export class ServiceAPI {
    constructor(
        private url: string,
        private returnItem: string,
        private payload?: any,
    ) { }
    async get() {
        const result = await fetchResponse(this.url, {
            method: 'GET',
        })
        return result;
    }

    async post() {
        const result = await fetchResponse(this.url, {
            method: 'POST',
            body: JSON.stringify(this.payload),
        })
        return result;
    }

    async put() {
        const result = await axios({
            method: 'put',
            url: this.url,
            data: this.payload,
        })
            .then((response) => {
                return this.returnResponse(response);
            })
            .catch((error) => {
                if (error.response.status === 404 || error.response.status === 0) {
                    if (window.location.href !== `${process.env.REACT_APP_URL}server`) {
                        window.location.href = `${process.env.REACT_APP_URL}server`;
                    }
                } else {
                    toastMessage('failure', '오류가 발생하여 실패하였습니다.');
                }
                return this.returnError(error);
            });
        return result;
    }

    async patch() {
        const result = await axios({
            method: 'patch',
            url: this.url,
            data: this.payload,
        })
            .then((response) => {
                return this.returnResponse(response);
            })
            .catch((error) => {
                if (error.response.status === 404 || error.response.status === 0) {
                    if (window.location.href !== `${process.env.REACT_APP_URL}server`) {
                        window.location.href = `${process.env.REACT_APP_URL}server`;
                    }
                } else {
                    toastMessage('failure', '오류가 발생하여 실패하였습니다.');
                }
                return this.returnError(error);
            });
        return result;
    }
    async passwordPatch() {
        const { token, ...item } = this.payload;

        const result = await axios({
            method: 'patch',
            url: this.url,
            data: item,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => {
                return this.returnResponse(response);
            })
            .catch((error) => {
                if (error.response.status === 404 || error.response.status === 0) {
                    if (window.location.href !== `${process.env.REACT_APP_URL}server`) {
                        window.location.href = `${process.env.REACT_APP_URL}server`;
                    }
                } else {
                    toastMessage('failure', '오류가 발생하여 실패하였습니다.');
                }
                return this.returnError(error);
            });
        return result;
    }

    async delete() {
        const result = await axios({
            method: 'delete',
            url: this.url,
            data: this.payload,
        })
            .then((response) => {
                return this.returnResponse(response);
            })
            .catch((error) => {
                if (error.response.status === 404 || error.response.status === 0) {
                    if (window.location.href !== `${process.env.REACT_APP_URL}server`) {
                        window.location.href = `${process.env.REACT_APP_URL}server`;
                    }
                } else {
                    toastMessage('failure', '오류가 발생하여 실패하였습니다.');
                }
                return this.returnError(error);
            });
        return result;
    }
}
