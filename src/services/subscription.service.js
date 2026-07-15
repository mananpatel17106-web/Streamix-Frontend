import api from "../api/axios";

class SubscriptionService {
  async toggleSubscription(channelId) {
    const response = await api.post(
      `/subscriptions/c/${channelId}`
    );

    return response.data;
  }

  async getSubscribedChannels(subscriberId) {
    const response = await api.get(
      `/subscriptions/u/${subscriberId}`
    );

    return response.data;
  }
}

export default new SubscriptionService();