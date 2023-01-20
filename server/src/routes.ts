import {FastifyInstance} from 'fastify'
import { z } from 'zod';
import dayjs from 'dayjs';
import { prisma } from "./lib/prisma";

export const appRoutes = async (app: FastifyInstance) => {

  app.post('/habits', async  (request, response) => {

    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number()).min(0).max(6)
    });

    const {title, weekDays} = createHabitBody.parse(request.body);
    const today = dayjs().startOf('day').toDate();

    const habits = await prisma.habit.create({
      data: {
        title, 
        created_at: today,
         weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
         }
      }
    });
  
    return habits;
  });

  app.get('/day', async  (request) => {

    const getDayParams = z.object({
      date: z.coerce.date()
    });

    const {date} = getDayParams.parse(request.query);
    const weekDay = dayjs(date).get('day');

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        weekDays: {
          some: {
            week_day: {
              equals: weekDay
            }
          }
        }
      }
    });

    const day = await prisma.day.findUnique({
      where: {
        date: date
      },
      include: {
         dayHabits: true
      }
    });

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return  dayHabit.habit_id
    })
  
    return {
      possibleHabits,
      completedHabits
    };
  });
}

