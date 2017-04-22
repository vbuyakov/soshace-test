import { MongoidPipe } from './mongoid.pipe';

describe('MongoidPipe', () => {
  it('create an instance', () => {
    const pipe = new MongoidPipe();
    expect(pipe).toBeTruthy();
  });
});
