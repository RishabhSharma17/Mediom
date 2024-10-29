import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupformat } from "@rishabhs_17/mediom-common";

export const userRouter = new Hono<{
    Bindings:{
        JWT_SECRET: string;
        DATABASE_URL:string,
    }
}>();



userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try{
      const body = await c.req.json();
      const { success } = signupformat.safeParse(body);
      if(success){
        const newuser = await prisma.user.create({
          data:{
            email: body.email,
            password: body.password,
            username:body.username
          },
        });
        const secret = c.env.JWT_SECRET;
        const token = await sign({id:newuser.id},secret);
    
        return c.json({
          token:token
        });
      }
      else{
        c.status(400);
        return c.json({msg:'Invalid signup data'});
      }
    }
    catch(e){
      console.log(e);
      c.status(500);
      return c.json({msg:"Invalid"});
    }
  });

  userRouter.post('/signin',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
      const body = await c.req.json();
      const { success } = signupformat.safeParse(body);
      if(!success){
        const user = await prisma.user.findUnique({
          where:{
            email:body.email,
          }
        });
    
        if(!user){
          c.status(403);
          return c.json({msg:'Invalid credentials'});
        }
    
        const token = await sign({id:user.id},c.env.JWT_SECRET);
        return c.json({jwt:token});
      }
      else{
       c.status(400);
       return c.json({msg:'Invalid signin data'}); 
      }
    }
    catch(e){
      console.log(e);
      c.status(500);
      return c.json({msg:"Invalid"});
    } 
  })