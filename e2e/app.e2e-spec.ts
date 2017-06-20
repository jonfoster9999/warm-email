import { WarmEmailPage } from './app.po';

describe('warm-email App', () => {
  let page: WarmEmailPage;

  beforeEach(() => {
    page = new WarmEmailPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
