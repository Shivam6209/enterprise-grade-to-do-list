import { parseTask } from '../taskParser';

describe('taskParser', () => {
  beforeEach(() => {
    // Mock Date.now() to return a consistent value
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should parse a task with all components', () => {
    const input = 'Finish landing page Aman by 11pm 20th June P1';
    const result = parseTask(input);

    expect(result).toMatchObject({
      id: '1234567890',
      name: 'Finish landing page',
      assignee: 'Aman',
      priority: 'P1',
    });
    expect(result?.dueDate).toBeTruthy();
  });

  it('should use default priority P3 when not specified', () => {
    const input = 'Call client Rajeev tomorrow 5pm';
    const result = parseTask(input);

    expect(result).toMatchObject({
      name: 'Call client',
      assignee: 'Rajeev',
      priority: 'P3',
    });
  });

  it('should handle tasks without dates', () => {
    const input = 'Review code John';
    const result = parseTask(input);

    expect(result).toMatchObject({
      name: 'Review code',
      assignee: 'John',
      dueDate: null,
      priority: 'P3',
    });
  });

  it('should handle tasks without assignees', () => {
    const input = 'Buy coffee tomorrow';
    const result = parseTask(input);

    expect(result).toMatchObject({
      name: 'Buy coffee',
      assignee: '',
      priority: 'P3',
    });
    expect(result?.dueDate).toBeTruthy();
  });

  it('should return null for invalid input', () => {
    const input = '';
    const result = parseTask(input);

    expect(result).toBeNull();
  });

  it('should parse a task with priority keywords', () => {
    const input = 'urgent meeting with team #work';
    const result = parseTask(input);

    expect(result).toBeTruthy();
    expect(result?.priority).toBe('P1');
    expect(result?.title).toBe('meeting with team');
    expect(result?.category).toBe('work');
  });

  it('should parse a task with date and time', () => {
    const input = 'Submit report by tomorrow at 5pm';
    const result = parseTask(input);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    expect(result).toBeTruthy();
    expect(result?.dueDate).toBe(tomorrow.toISOString().split('T')[0]);
    expect(result?.dueTime).toBeTruthy();
    expect(result?.title).toBe('Submit report');
  });

  it('should handle empty input', () => {
    const result = parseTask('');
    expect(result).toBeNull();
  });

  it('should set default priority to P3', () => {
    const input = 'Buy groceries';
    const result = parseTask(input);

    expect(result).toBeTruthy();
    expect(result?.priority).toBe('P3');
  });

  it('should parse multiple priority keywords correctly', () => {
    const inputs = [
      { text: 'critical task', expected: 'P1' },
      { text: 'important meeting', expected: 'P2' },
      { text: 'normal priority task', expected: 'P3' },
      { text: 'optional reading', expected: 'P4' },
    ];

    inputs.forEach(({ text, expected }) => {
      const result = parseTask(text);
      expect(result?.priority).toBe(expected);
    });
  });

  it('should extract category from hashtag', () => {
    const inputs = [
      { text: 'Review code #dev', expected: 'dev' },
      { text: 'Team lunch #social', expected: 'social' },
      { text: 'No category task', expected: undefined },
    ];

    inputs.forEach(({ text, expected }) => {
      const result = parseTask(text);
      expect(result?.category).toBe(expected);
    });
  });
}); 