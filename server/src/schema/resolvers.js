import { schedules } from '../database';

export const resolvers = {
  Query: {
    getScheduels: () => schedules,
  },

  Mutation: {
    createSchedule:async (_, args)=>{
      const newSchedule = {...args.input, id:Math.random().toString(36).substr(2, 16)}
      schedules.push(newSchedule)
      return newSchedule
    },
  }
};

export default resolvers