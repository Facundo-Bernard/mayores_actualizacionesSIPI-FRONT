const initialState = {
  isLoggedIn: false,
  user: {
      name: '',
      tipoUsuario: 1, // 1: Cliente, 2: Secretaria, 3: Abogado
      id: "",
      black:""
  },
  progreso: [], // Almacena los datos de progreso del usuario
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
      case 'LOGIN':
          return {
              ...state,
              isLoggedIn: true,
              user: {
                  name: action.payload.name,
                  id: action.payload.id,
                  black:action.payload.black
              },
          };
          case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: {
                    name: '',
                    tipoUsuario: 1,
                    id: ''
                },
                progreso: [],
            };
      case 'LOAD_PROGRESO':
          return {
              ...state,
              progreso: action.payload,
          };
      default:
          return state;
  }
}

export default counterReducer;
