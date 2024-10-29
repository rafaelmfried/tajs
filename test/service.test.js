import { describe, it, expect, beforeEach, jest} from '@jest/globals';
import Service from '../src/service.js';
import fs from 'fs/promises';

describe('Service Test Suite', () => {
  let _service;
  const filename = 'testfile.ndsjon';

  beforeEach(() => {
    _service = new Service({ filename });
  });

  describe('#read', () => {
    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(
        fs,
        fs.readFile.name
      ).mockResolvedValue('')
  
      const result = await _service.read();
      expect(result).toEqual([]);
    });

    it('should return a array with a user list without password', async () => {
      // Arrange of the Database info to mock
      const dbData = [
        { 
          username: 'user_1',
          password: 'password_1',
          createdAt: new Date().toISOString()
        },
        { 
          username: 'user_2',
          password: 'password_2',
          createdAt: new Date().toISOString()
        },
        { 
          username: 'user_3',
          password: 'password_3',
          createdAt: new Date().toISOString()
        }
      ]

      const filecContents = dbData
        .map( item => JSON.stringify(item).concat('\n')).join('')

      jest
        .spyOn(
          fs,
          "readFile" // Olhar porque isso no spyOn ???
        ).mockResolvedValue(filecContents)

      // Act
      const result = await _service.read()

      // Assert
      const expected = dbData.map(({ password, ...rest }) => ({ ...rest }));
      expect(result).toEqual(expected);

      // Criar um caso de teste para quando o arquivo n existir. fs/Sync -> fsExists(filename)
    });
  });
   
})