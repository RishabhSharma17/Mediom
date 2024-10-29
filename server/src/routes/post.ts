import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { BlogInput, updatebloginput } from "@rishabhs_17/mediom-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export const postRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET:string;
    },
    Variables:{
        userId:string;
    }
}>();

postRouter.use('/*',async (c,next)=>{
    const header = c.req.header('authorization') || "" ;
    const res = await verify(header,c.env.JWT_SECRET) as JWTPayload;
    if(res){
        const id = res.id || "";
        c.set('userId', id.toString());
      await next();
    }
    else{
      c.status(401);
      return c.json({msg:'Unauthorized'});
    }
});

postRouter.post('/create',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const body = await c.req.json();
        const {success} = BlogInput.safeParse(body);
        if(!success){
            return c.json({
                msg:"Invalid Inputs",
            })
        }
        else{
            const authorId = c.get("userId");
            console.log(authorId);
            const post = await prisma.post.create({
                data:{
                    title:body.title,
                    content:body.content,
                    authorId:authorId,
                }
            })
            return c.json({
                id:post.id,
            });
        }
    }
    catch(e){
        console.log(e);
        c.status(500);
        return c.json({msg:'An error occurred while creating a post'});
    }
});

postRouter.put('/update',async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const{success} = updatebloginput.safeParse(body);

    if(!success){
        return c.json({
            msg:"Invalid Inputs",
        });
    }
    else{
        const post = await prisma.post.update({
            where:{
                id:body.id
            },
            data:{
                title:body.title,
                content:body.content,
            }
        })
        return c.json({
            msg:"Updated successfully !",
            id:post.id,
        });
    }
});

postRouter.get('/single/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogid = c.req.param('id');
    const blog = await prisma.post.findUnique({
        where:{
            id:blogid,
        },
        select:{
            content:true,
            title:true,
            author:{
                select:{
                    username:true,
                }
            }
        }
    })
    return c.json({
        blog,
    });
});

postRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    username:true
                }
            },
        }
    });

    return c.json({blogs:blogs});
});
  