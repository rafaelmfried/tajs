import { describe, expect, it, jest } from '@jest/globals';
import Person from '../src/person';

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw if the name is not present', () => {
        // Mock é a entranda necessaria para que o teste funcione

        const mockInvalidPerson = {
          name: '',
          cpf: '123.456.789-00'
        }

        expect(() => Person.validate(mockInvalidPerson))
          .toThrow(
            new Error('name is required'),
          )
    })

    it('should throw if the cpf is not present', () => {
      const mockInvalidPerson = {
        name: 'Rafael Friederick',
        cpf: ''
      }

      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(
          new Error('cpf is required'),
        )
    })

    it('should not throw if person is valid', () => {
      const mockInvalidPerson = {
        name: 'Rafael Friederick',
        cpf: '040.065.995-60'
      }

      expect(() => Person.validate(mockInvalidPerson))
        .not
        .toThrow()
    })
  });

  describe('#format', () => {
    it('should format the person name and CPF', () => {
      // AAA

      // Arrange = Prepara
      const mockPerson = {
        name: 'Rafael Friederick',
        cpf: '000.000.000-00'
      }

      // Act = Executar
      const formattedPerson = Person.format(mockPerson)

      // Assert = Validar
      const expected = {
        name: 'Rafael',
        cpf: '00000000000',
        lastName: 'Friederick'
      }

      expect(formattedPerson).toStrictEqual(expected);

    })
  });
  
  describe('#process', () => {
    it('should process a valid person', () => {
      // Arrange
      const mockPerson = {
        name: 'Rafael Friederick',
        cpf: '040.065.995-60'
      }

      jest.spyOn(
        Person,
        Person.validate.name,
      ).mockReturnValue()

      jest.spyOn(
        Person,
        Person.format.name
      ).mockReturnValue({
        name: 'Rafael',
        lastName: 'Friederick',
        cpf: '04006599560',
      })

      //Act
      const result = Person.process(mockPerson);

      // Assert
      const expected = 'ok'

      expect(result).toStrictEqual(expected)
    });
  });

});
