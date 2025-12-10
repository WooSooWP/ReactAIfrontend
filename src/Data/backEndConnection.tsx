export type ApiConfigType = {
  ip: string;
  port: string;
  getBaseUrl: () => string;
  getUserUrl: () => string;
  getUserCheckUrl: () => string;
  getEntriesUrl: () => string;
};

const apiConfig: ApiConfigType = {
  ip: "127.0.0.1",
  port: "5000",

  getBaseUrl() {
    return `http://${this.ip}:${this.port}`;
  },

  getUserUrl() {
    return `${this.getBaseUrl()}/users`;
  },

  getUserCheckUrl() {
    return `${this.getBaseUrl()}/users/check`;
  },

  getEntriesUrl() {
    return `${this.getBaseUrl()}/entries`;
  }
};

export default apiConfig;
