import HTTPTransport from '../framework/HTTPTransport';

const resourcesApi = new HTTPTransport('resources');

export default class ResourcesApi {

  public async getLink(path: string): Promise<string> {
    return resourcesApi.get<string>(path, {});
  }
}
