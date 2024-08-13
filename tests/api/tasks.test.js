import { expect, test, describe, afterEach } from "vitest";
import { createMocks } from "node-mocks-http";
import { PrismaClient } from "@prisma/client";

import Handler from "../../pages/api/list";
import HandlerID from "../../pages/api/list/[id]";

describe("usando endpoints", async () => {

  afterEach(async () => {
    const prisma = new PrismaClient();
    const deleteTasks = prisma.task.deleteMany();

    await prisma.$transaction([deleteTasks]);

    await prisma.$disconnect();
  });
  describe("endpoints sem id", () => {

    test("deve retornar um 405", async () => {
      const { req, res } = createMocks({
        method: "PUT",
        body: {
          title: "titulo",
          description: "descrição",
          expirationDate: "13/11/2000",
        },
      });

      await Handler(req, res);
      expect(res._getStatusCode()).toBe(405);
    });

    test("deve criar uma tarefa", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          title: "titulo",
          description: "descrição",
          expirationDate: "13/11/2000",
        },
      });

      await Handler(req, res);
      expect(res._getStatusCode()).toBe(201);
    });

    test("deve retornar um erro com dia inválida", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          title: "titulo",
          description: "descrição",
          expirationDate: "40/11/2000",
        },
      });

      await Handler(req, res);
      expect(res._getStatusCode()).toBe(400);
    });

    test("deve retornar um erro com mês inválida", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          title: "titulo",
          description: "descrição",
          expirationDate: "13/15/2000",
        },
      });

      await Handler(req, res);
      expect(res._getStatusCode()).toBe(400);
    });

    test("deve retornar um erro com ano antes de 1900 e depois de 2100", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          title: "titulo",
          description: "descrição",
          expirationDate: "13/10/1800",
        },
      });

      await Handler(req, res);
      expect(res._getStatusCode()).toBe(400);
    });
  });

  describe("endpoints com id", () => {
    test("deve retornar um 405", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          title: "titulo",
          description: "descrição",
          expirationDate: "13/11/2000",
        },
      });

      await HandlerID(req, res);
      expect(res._getStatusCode()).toBe(405);
    });

    test("deve atualizar uma tarefa", async () => {

      const { req: req0, res: res0 } = createMocks({
        method: "POST",
        body: {
          title: "titulo",
          description: "descrição",
          expirationDate: "13/11/2000",
        },
      });

      await Handler(req0, res0);

      const { req, res } = createMocks({
        method: "GET",
        query: {id:2}
      });

      await Handler(req, res);


      const { req: req2, res: res2 } = createMocks({
        method: "PUT",
        query: { id: "2" },
        body: {
          title: "novo titulo",
          description: "descrição",
          expirationDate: "13/11/2000",
        },
      });

      await HandlerID(req2, res2);
      expect(res._getJSONData()).not.toEqual(res2._getJSONData());
    });

    test("deve excluir uma tarefa", async () => {

      const { req, res } = createMocks({
        method: "POST",
        body: {
          title: "titulo",
          description: "descrição",
          expirationDate: "13/11/2000",
        },
      });

      await Handler(req, res);

      const { req: req2, res: res2 } = createMocks({
        method: "DELETE",
        query: { id: 3 },
      });

      await HandlerID(req2, res2);

      expect(res2._getStatusCode()).toEqual(204);
    });
  });

  describe("Testes de buscar", async () => {
    test("deve retornar tarefas que contenham na descrição ou titulo o texto de busca", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          title: "titulo",
          description: "descrição",
          expirationDate: "13/11/2000",
        },
      });

      await Handler(req, res);

      const { req: req2, res: res2 } = createMocks({
        method: "POST",
        body: {
          title: "titulo até 2",
          description: "descrição 2",
          expirationDate: "13/11/2024",
        },
      });

      await Handler(req2, res2);

      await Handler(req, res);

      const { req: req3, res: res3 } = createMocks({
        method: "POST",
        body: {
          title: "titulo até 3",
          description: "descrição 3",
          expirationDate: "13/11/2021",
        },
      });

      await Handler(req3, res3);

      const { req: req4, res: res4 } = createMocks({
        method: "POST",
        body: {
          textSearch: "até",
        },
      });

      await Handler(req4, res4);

      const elementsLength = res4._getJSONData().data.length;

      expect(elementsLength).toBe(2);
    });
  });
});
