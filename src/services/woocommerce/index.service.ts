import WooCommerceRestApi, { WooCommerceRestApiVersion } from '@woocommerce/woocommerce-rest-api';

const {
  WOOCOMMERCE_API_KEY,
  WOOCOMMERCE_API_SECRET,
  WOOCOMMERCE_API_VERSION,
  WOOCOMMERCE_API_URL,
} = process.env;

export const wooApiClient = new WooCommerceRestApi({
  url: WOOCOMMERCE_API_URL as string,
  consumerKey: WOOCOMMERCE_API_KEY as string,
  consumerSecret: WOOCOMMERCE_API_SECRET as string,
  version: WOOCOMMERCE_API_VERSION as WooCommerceRestApiVersion,
});

export const getWooData = async (endpoint: string, paramsObj?: any) => {
  try {
    let results: any[] = [];
    let page = 1;
    const response = await wooApiClient.get(endpoint, { ...paramsObj, page });
    const { data, headers } = response;
    const pages = Number(headers['x-wp-totalpages']);
    const total = Number(headers['x-wp-total']);

    results = results.concat(data);

    if (pages > page) {
      page += 1;
      /* eslint-disable no-await-in-loop */
      for (let i = page; i <= pages; i++) {
        const nextResponse = await wooApiClient.get(endpoint, { ...paramsObj, page });

        results = results.concat(nextResponse.data);
        page += 1;
      }
      /* eslint-enable no-await-in-loop */
    }

    return { results, total };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const batchModifyWooData = async (endpoint: string, payload: any) => {
  // Create, update and delete can be used for intended action payload array keys
  // Example payload: { create: [...data], update: [...data], delete: [...itemIds]}
  try {
    const response = await wooApiClient.post(`${endpoint}/batch`, payload);
    const { data } = response;

    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const postWooData = async (endpoint: string, payload: any) => {
  try {
    const response = await wooApiClient.post(endpoint, payload);
    const { data } = response;

    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const putWooData = async (endpoint: string, payload: any) => {
  try {
    const response = await wooApiClient.put(endpoint, payload);
    const { data } = response;

    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const deleteWooData = async (endpoint: string, force?: boolean) => {
  try {
    // Use 'force: true' if you wish to permanently delete the item data. Default is false.
    const response = await wooApiClient.delete(endpoint, { force });
    const { data } = response;

    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
