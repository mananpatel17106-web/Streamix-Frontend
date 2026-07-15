import api from "../api/axios";

class SubscriptionService {
  // Toggle Subscribe

  async toggleSubscription(channelId) {
    const response = await api.post(`/subscriptions/c/${channelId}`);

    return response.data;
  }

  // Subscribers of channel

  async getChannelSubscribers(channelId) {
    const response = await api.get(`/subscriptions/c/${channelId}`);

    return response.data;
  }

  // Channels user subscribed

  async getSubscribedChannels(subscriberId) {
    const response = await api.get(`/subscriptions/u/${subscriberId}`);

    return response.data;
  }

  // Get Channel Profile

  async getChannelProfile(username) {
    const response = await api.get(`/users/c/${username}`);

    return response.data;
  }
}

export default new SubscriptionService();
