// import Slack from 'slack-node';
import SlackWebhook from 'slack-webhook';

const webhookUri = process.env.webhook;
const channel = process.env.channel;

const slack = new SlackWebhook(webhookUri, {
  defaults: {
    username: 'API',
    channel,
    icon_emoji: ':computer:',
  },
});

slack.send('Server is up and running...');

export default slack;
