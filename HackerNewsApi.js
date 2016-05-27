const HackerNewsApiV0 = 'https://hacker-news.firebaseio.com/v0/';
const HackerNewsApi = {
  topStories: HackerNewsApiV0 + 'topstories.json',
  newStories: HackerNewsApiV0 + 'newstories.json',
  showStories: HackerNewsApiV0 + 'showstories.json',
  askStories: HackerNewsApiV0 + 'askstories.json',
  jobStories: HackerNewsApiV0 + 'jobstories.json',
  post: HackerNewsApiV0 + 'item/${postId}.json'
};

module.exports =  HackerNewsApi;
