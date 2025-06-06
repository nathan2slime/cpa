export type TCourses =
  | 'Todos'
  | 'Bacharelado em Administração'
  | 'Bacharelado em Arquitetura e Urbanismo'
  | 'Bacharelado em Biomedicina'
  | 'Bacharelado em Direito'
  | 'Bacharelado em Educação Física'
  | 'Bacharelado em Enfermagem'
  | 'Bacharelado em Engenharia Civil'
  | 'Bacharelado em Engenharia Elétrica'
  | 'Bacharelado em Farmácia'
  | 'Bacharelado em Medicina'
  | 'Bacharelado em Fisioterapia'
  | 'Bacharelado em Nutrição'
  | 'Bacharelado em Odontologia'
  | 'Bacharelado em Psicologia'
  | 'Bacharelado em Serviço Social'
  | 'Bacharelado em Terapia Ocupacional'
  | 'Licenciatura em Pedagogia'
  | 'Superior de Tecnologia em Análise e Desenvolvimento de Sistemas'
  | 'Superior de Tecnologia em Design de Moda'
  | 'Superior de Tecnologia em Estética e Cosmética'
  | 'Superior de Tecnologia em Radiologia'

export type CoursesReq = {
  id: string
  type: 'TECH' | 'HUMAN' | 'HEALTH'
  name: TCourses
}
