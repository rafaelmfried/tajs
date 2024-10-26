class Person {
  static validate(person) {
    if(!person.name) throw new Error('name is required')
    if(!person.cpf) throw new Error('cpf is required')
  }

  static format(person) {
    const [name, ...lastName] = person.name.split(' ')
    return {
      cpf: person.cpf.replace(/\D/g, ''),
      name,
      lastName: lastName.join(' ')
    }
  }

  // Criar teste para o save como Exercicio
  static save(person) {
    if(![ 'cpf', 'name', 'lastName']
        .every(prop => person[prop]))
          throw new Error(`cannot save invalid person: ${ JSON.stringify(person)}`)
    
    // Banco de dados, api, etc...

    console.log('redistrado com sucesso!!', person)


  }

  static process(person) {
    this.validate(person)

    const personFormatted = this.format(person)

    return 'ok';
  }
}

Person.process({
  name: 'Fulano',
  cpf: '040.065.995-60'
});

export default Person;
