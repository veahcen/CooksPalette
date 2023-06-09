import {$authHost, $host} from "./index";


export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type', )
    return data
}

export const deleteType = async (type) => {
    const { data } = await $authHost.delete('api/type', { data: type });
    return data;
}


export const createFood = async (food) => {
    const {data} = await $authHost.post('api/food', food)
    return data
}

export const deleteFood = async (id) => {
    try {
        const response = await $authHost.delete(`api/food/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const fetchFood = async (typeFoodId, page, limit = 5) => {
    const {data} = await $host.get('api/food', {
       params: {
           typeFoodId,
           page,
           limit
       }
    })
    return data
}

export const updateFoodRating = async (id, rating) => {
    try {
        const response = await $authHost.put(`/api/food/${id}/rating`, { rating });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


export const fetchOneFood = async (id) => {
    const {data} = await $host.get('api/food/' + id)
    return data
}


export const addToFavorite = async (foodId) => {
    const {response} = await $authHost.post('api/favorite', foodId)
    return response
}

export const getFavorite = async () => {
    const {data} = await $authHost.get('api/favorite')
    return data
}

export const removeFromFavorite = async (foodId) => {
    const { data } = await $authHost.delete('api/favorite', { params: { foodId } });
    return data;
}

export const isFoodInFavorites = async (foodId) => {
    try {
        const response = await $authHost.get('api/favorite', { params: { foodId } });
        return response.data.isFavorite;
    } catch (error) {
        console.log('Ошибка при проверке статуса избранности:', error);
        throw error;
    }
}

/*export const createReview = async (foodId, review) => {
    try {
        const response = await $authHost.post(`api/food/${foodId}/reviews`, review);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const deleteReview = async (reviewId) => {
    try {
        const response = await $authHost.delete(`api/reviews/${reviewId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const getReviewsByFood = async (foodId) => {
    try {
        const { data } = await $host.get(`api/food/${foodId}/reviews`);
        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};*/


