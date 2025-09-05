import { saveLocalStorage, getLocalStorage, setLocalStorage } from './helper';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock console.error to test error handling
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Helper Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe('saveLocalStorage', () => {
    describe('Positive scenarios', () => {
      it('should save simple string data successfully', () => {
        const testData = 'test string';
        const key = 'testKey';

        const result = saveLocalStorage(testData, key);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(testData));
        expect(result).toBe(true);
      });

      it('should save object data successfully', () => {
        const testData = { name: 'John', age: 30 };
        const key = 'userObject';

        const result = saveLocalStorage(testData, key);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(testData));
        expect(result).toBe(true);
      });

      it('should save array data successfully', () => {
        const testData = [1, 2, 3, 'four', { five: 5 }];
        const key = 'testArray';

        const result = saveLocalStorage(testData, key);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(testData));
        expect(result).toBe(true);
      });

      it('should save null value successfully', () => {
        const testData = null;
        const key = 'nullValue';

        const result = saveLocalStorage(testData, key);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(testData));
        expect(result).toBe(true);
      });

      it('should save number data successfully', () => {
        const testData = 42;
        const key = 'numberValue';

        const result = saveLocalStorage(testData, key);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(testData));
        expect(result).toBe(true);
      });

      it('should save boolean data successfully', () => {
        const testData = true;
        const key = 'booleanValue';

        const result = saveLocalStorage(testData, key);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(testData));
        expect(result).toBe(true);
      });
    });

    describe('Negative scenarios', () => {
      it('should handle localStorage.setItem throwing an error', () => {
        localStorageMock.setItem.mockImplementationOnce(() => {
          throw new Error('Storage quota exceeded');
        });

        const testData = { large: 'data' };
        const key = 'failKey';

        const result = saveLocalStorage(testData, key);

        expect(result).toBe(false);
      });

      it('should handle circular reference objects', () => {
        const circularObj: any = { name: 'test' };
        circularObj.self = circularObj; // Create circular reference

        const result = saveLocalStorage(circularObj, 'circularKey');

        expect(result).toBe(false);
      });

      it('should handle undefined data', () => {
        const testData = undefined;
        const key = 'undefinedKey';

        const result = saveLocalStorage(testData, key);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(testData));
        expect(result).toBe(true);
      });

      it('should handle empty string key', () => {
        const testData = 'test';
        const key = '';

        const result = saveLocalStorage(testData, key);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(testData));
        expect(result).toBe(true);
      });
    });
  });

  describe('getLocalStorage', () => {
    describe('Positive scenarios', () => {
      it('should retrieve and parse string data successfully', () => {
        const testData = 'test string';
        const key = 'testKey';
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(testData));

        const result = getLocalStorage(key);

        expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
        expect(result).toBe(testData);
      });

      it('should retrieve and parse object data successfully', () => {
        const testData = { name: 'John', age: 30 };
        const key = 'userObject';
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(testData));

        const result = getLocalStorage(key);

        expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
        expect(result).toEqual(testData);
      });

      it('should retrieve and parse array data successfully', () => {
        const testData = [1, 2, 3, 'four', { five: 5 }];
        const key = 'testArray';
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(testData));

        const result = getLocalStorage(key);

        expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
        expect(result).toEqual(testData);
      });

      it('should retrieve null value successfully', () => {
        const testData = null;
        const key = 'nullValue';
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(testData));

        const result = getLocalStorage(key);

        expect(result).toBe(testData);
      });

      it('should retrieve number data successfully', () => {
        const testData = 42;
        const key = 'numberValue';
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(testData));

        const result = getLocalStorage(key);

        expect(result).toBe(testData);
      });

      it('should retrieve boolean data successfully', () => {
        const testData = true;
        const key = 'booleanValue';
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(testData));

        const result = getLocalStorage(key);

        expect(result).toBe(testData);
      });
    });

    describe('Negative scenarios', () => {
      it('should return null when key does not exist', () => {
        localStorageMock.getItem.mockReturnValueOnce(null);

        const result = getLocalStorage('nonExistentKey');

        expect(result).toBe(null);
      });

      it('should return null when localStorage.getItem returns null', () => {
        localStorageMock.getItem.mockReturnValueOnce(null);

        const result = getLocalStorage('someKey');

        expect(result).toBe(null);
      });

      it('should handle malformed JSON data', () => {
        localStorageMock.getItem.mockReturnValueOnce('invalid json {');

        const result = getLocalStorage('malformedKey');

        expect(result).toBe(null);
      });

      it('should handle localStorage.getItem throwing an error', () => {
        localStorageMock.getItem.mockImplementationOnce(() => {
          throw new Error('Storage access denied');
        });

        const result = getLocalStorage('errorKey');

        expect(result).toBe(null);
      });

      it('should handle empty string from localStorage', () => {
        localStorageMock.getItem.mockReturnValueOnce('');

        const result = getLocalStorage('emptyKey');

        expect(result).toBe(null);
      });

      it('should handle undefined from localStorage', () => {
        localStorageMock.getItem.mockReturnValueOnce(undefined as any);

        const result = getLocalStorage('undefinedKey');

        expect(result).toBe(null);
      });
    });
  });

  describe('setLocalStorage', () => {
    describe('Positive scenarios', () => {
      it('should set string value successfully', () => {
        const key = 'testKey';
        const value = 'test value';

        setLocalStorage(key, value);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      });

      it('should set object value successfully', () => {
        const key = 'objectKey';
        const value = { name: 'John', age: 30 };

        setLocalStorage(key, value);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      });

      it('should set array value successfully', () => {
        const key = 'arrayKey';
        const value = [1, 2, 3, 'test'];

        setLocalStorage(key, value);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      });

      it('should set null value successfully', () => {
        const key = 'nullKey';
        const value = null;

        setLocalStorage(key, value);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      });

      it('should set undefined value successfully', () => {
        const key = 'undefinedKey';
        const value = undefined;

        setLocalStorage(key, value);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      });
    });

    describe('Negative scenarios', () => {
      it('should handle localStorage.setItem throwing an error and log it', () => {
        const error = new Error('Storage quota exceeded');
        localStorageMock.setItem.mockImplementationOnce(() => {
          throw error;
        });

        const key = 'errorKey';
        const value = 'test value';

        setLocalStorage(key, value);

        expect(consoleSpy).toHaveBeenCalledWith(
          `Error setting localStorage key "${key}":`,
          error
        );
      });

      it('should handle circular reference objects and log error', () => {
        const circularObj: any = { name: 'test' };
        circularObj.self = circularObj;

        const key = 'circularKey';

        setLocalStorage(key, circularObj);

        expect(consoleSpy).toHaveBeenCalledWith(
          `Error setting localStorage key "${key}":`,
          expect.any(Error)
        );
      });

      it('should handle JSON.stringify throwing an error', () => {
        // Create an object that will throw during stringification
        const problematicObj = {};
        Object.defineProperty(problematicObj, 'toJSON', {
          value: () => {
            throw new Error('JSON stringify error');
          }
        });

        const key = 'problematicKey';

        setLocalStorage(key, problematicObj);

        expect(consoleSpy).toHaveBeenCalledWith(
          `Error setting localStorage key "${key}":`,
          expect.any(Error)
        );
      });

      it('should handle empty string key', () => {
        const key = '';
        const value = 'test value';

        setLocalStorage(key, value);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      });
    });
  });

  describe('Integration scenarios', () => {
    it('should save and retrieve data consistently', () => {
      // Clear mocks for integration test
      jest.clearAllMocks();

      const testData = { user: 'john', preferences: { theme: 'dark' } };
      const key = 'integrationTest';

      // Mock setItem to store the data
      let storedValue: string;
      localStorageMock.setItem.mockImplementation((k, v) => {
        storedValue = v;
      });

      // Mock getItem to return the stored data
      localStorageMock.getItem.mockImplementation(() => storedValue!);

      // Save data
      const saveResult = saveLocalStorage(testData, key);
      expect(saveResult).toBe(true);

      // Retrieve data
      const retrievedData = getLocalStorage(key);
      expect(retrievedData).toEqual(testData);
    });

    it('should handle save-retrieve cycle with different data types', () => {
      jest.clearAllMocks();

      const testCases = [
        { data: 'string', key: 'stringTest' },
        { data: 123, key: 'numberTest' },
        { data: true, key: 'booleanTest' },
        { data: null, key: 'nullTest' },
        { data: [1, 2, 3], key: 'arrayTest' },
        { data: { nested: { deep: 'value' } }, key: 'objectTest' },
      ];

      const storage: Record<string, string> = {};

      localStorageMock.setItem.mockImplementation((key, value) => {
        storage[key] = value;
      });

      localStorageMock.getItem.mockImplementation((key) => {
        return storage[key] || null;
      });

      testCases.forEach(({ data, key }) => {
        const saveResult = saveLocalStorage(data, key);
        expect(saveResult).toBe(true);

        const retrievedData = getLocalStorage(key);
        expect(retrievedData).toEqual(data);
      });
    });

    it('should handle mixed success and failure scenarios', () => {
      jest.clearAllMocks();

      const storage: Record<string, string> = {};

      // Mock successful operations for most keys
      localStorageMock.setItem.mockImplementation((key, value) => {
        if (key === 'failKey') {
          throw new Error('Storage full');
        }
        storage[key] = value;
      });

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'corruptKey') {
          return 'invalid json {';
        }
        return storage[key] || null;
      });

      // Successful save
      expect(saveLocalStorage('success', 'successKey')).toBe(true);
      
      // Failed save
      expect(saveLocalStorage('fail', 'failKey')).toBe(false);
      
      // Successful retrieve
      expect(getLocalStorage('successKey')).toBe('success');
      
      // Failed retrieve (corrupt data)
      expect(getLocalStorage('corruptKey')).toBe(null);
      
      // Non-existent key
      expect(getLocalStorage('nonExistentKey')).toBe(null);
    });
  });

  describe('Edge cases and performance', () => {
    it('should handle very large data sets', () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => ({
        id: i,
        data: `item-${i}`,
        timestamp: Date.now(),
      }));

      const result = saveLocalStorage(largeArray, 'largeData');

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'largeData',
        JSON.stringify(largeArray)
      );
      expect(result).toBe(true);
    });

    it('should handle deeply nested objects', () => {
      const deepObject: any = { level1: {} };
      let current = deepObject.level1;

      // Create 100 levels of nesting
      for (let i = 2; i <= 100; i++) {
        current[`level${i}`] = {};
        current = current[`level${i}`];
      }
      current.value = 'deep value';

      const result = saveLocalStorage(deepObject, 'deepObject');

      expect(result).toBe(true);
    });

    it('should handle special characters in keys and values', () => {
      const specialKey = '🔑key-with-émojis@#$%';
      const specialValue = {
        emoji: '🚀',
        unicode: 'café',
        symbols: '!@#$%^&*()',
        newlines: 'line1\nline2\r\nline3',
        quotes: 'single\'quotes and "double" quotes',
      };

      const result = saveLocalStorage(specialValue, specialKey);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        specialKey,
        JSON.stringify(specialValue)
      );
      expect(result).toBe(true);
    });
  });
});