import { describe, it, expect, beforeEach, jest} from '@jest/globals';
import Service from '../src/service.js';
import crypto from 'node:crypto';
import fs from 'fs/promises';

describe('Service Test Suite', () => {
  let _service;
  const filename = 'testfile.ndsjon';
  const MOCKED_HASH_PWD = 'hashedpassword';

  describe('#read', () => {
    beforeEach(() => {
      _service = new Service({ filename });
    });

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

  describe('#create - spies', () => {
    beforeEach(() => {
      jest.spyOn(
        crypto,
        crypto.createHash.name
      )
      .mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD),
  
      })
  
      jest.spyOn(
        fs,
        fs.appendFile.name
      )
      .mockResolvedValue()
  
      _service = new Service({ filename });
    });

    it('should call appendFile with right params', async () => {
      /// Arrange
      const input = {
        username: 'user_1',
        password: 'password_1'
      };

      const expectedCreatedAt = new Date().toISOString();

      jest.spyOn(
        Date.prototype,
        Date.prototype.toISOString.name
      )
      .mockReturnValue(expectedCreatedAt);
      // Act
      await _service.create(input);
      // Assert
      // Assert Hash Password Function pois usa no create.
      expect(crypto.createHash).toHaveBeenNthCalledWith(1, 'sha256');

      const hash = crypto.createHash('sha256')

      expect(hash.update).toHaveBeenCalledWith(input.password);
      
      expect(hash.digest).toHaveBeenCalledWith('hex');

      // Assert do create function

      const expected = JSON.stringify({
        ...input,
        createdAt: expectedCreatedAt,
        password: MOCKED_HASH_PWD 
      }).concat('\n');

      expect(fs.appendFile).toHaveBeenCalledWith(
        filename,
        expected
      );

    });
  });
   
})