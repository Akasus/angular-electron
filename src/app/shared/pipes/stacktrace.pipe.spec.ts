import { StacktracePipe } from './stacktrace.pipe';

describe('StacktracePipe', () => {
  it('create an instance', () => {
    const pipe = new StacktracePipe();
    expect(pipe).toBeTruthy();
  });
});
