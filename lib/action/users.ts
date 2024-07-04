"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
export type UserProps = {
  Title: string;
  Description: string;
  Media: string;
  Category: string;
 Collections: string;
  Tags: string;
  Sizes: string;
  Colors: string;
  Price: number;
  Expense: number;
 
};
export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
}
export async function createUser(data: UserProps) {
  try {
    const user = await prisma.user.create({
      data: {
        title: data.Title,
      description : data.Description,
      media : data.Media ,
       category : data.Category,
        collections : data.Collections ,
          tags: data.Tags ,
          sizes : data.Sizes ,
           colors : data.Colors ,
            price : data.Price ,
              expense : data.Expense ,

      },
    });
    revalidatePath("/");
    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function createBulkUsers(users: UserProps[]) {
  try {
    for (const user of users) {
      await createUser(user);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUsers() {
  try {
    await prisma.user.deleteMany();
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}