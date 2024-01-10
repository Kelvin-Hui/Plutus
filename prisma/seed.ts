import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {

  const admin1 = await prisma.user.upsert({
    where:{username : "admin1"},
    update:{
    },
    create:{
      username : "admin1",
      password : await bcrypt.hash("admin1", 10),
      cash : 25000.00,
      wathchList:{
        createMany:{
          data:[
            {symbol : "META"},
            {symbol : "AMZN"},
            {symbol : "AAPL"},
            {symbol : "GOOG"},
            {symbol : "NFLX"},
            {symbol : "SPY"},
          ]
        }
      },
      transcations:{
        createMany:{
          data:[
            {symbol : "AAPL", quantity : 5, cost : 2, createdAt : new Date("2024-01-09")},
            {symbol : "AAPL", quantity : 5, cost : 2, createdAt : new Date("2024-01-08")},
            {symbol : "SPY", quantity : -10, cost : 3, createdAt : new Date("2024-01-07")},
            {symbol : "SPY", quantity : 20, cost : 4, createdAt : new Date("2024-01-06")},
            {symbol : "VOO", quantity : 20, cost : 5, createdAt : new Date("2024-01-05")},
            {symbol : "VOO", quantity : 15, cost : 5, createdAt : new Date("2024-01-04")}
          ]
        }
      },
      profolio:{
        createMany:{
          data:[
            {symbol : "AAPL", quantity: 10, cost : 2},
            {symbol : "VOO", quantity: 35, cost : 5},
            {symbol : "SPY",  quantity: 10, cost : 4}
          ]
        }
      },
      values:{
        create:{
          balance : 25000
        }
      },
    }

  })

  console.log(admin1);

  
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
