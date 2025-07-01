-- CreateTable
CREATE TABLE "Loja" (
    "id" SERIAL NOT NULL,
    "nomeDaloja" TEXT NOT NULL,
    "franqueado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "dataDeInauguracao" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loja_pkey" PRIMARY KEY ("id")
);
