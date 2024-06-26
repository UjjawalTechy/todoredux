const initialData = {
  list: [],
};

const todoreducers = (state = initialData, action) => {
  switch (action.type) {
    case "ADDTODO":
      const { id, data } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            data: data,

          },
        ],
      };

    case "DELETE_TODO":
      const newList = state.list.filter((item) => item.id !== action.id);
      return {
        ...state,
        list: newList,
      };

    case "REMOVE_TODO":
      return {
        ...state,
        list: [],
      };

    default:
      return state;
  }
};

export default todoreducers;
