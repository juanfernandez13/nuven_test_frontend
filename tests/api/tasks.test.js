import { expect, test, describe, afterEach, beforeEach } from "vitest";

import Handler from "../../pages/api/list";
import { createMocks } from "node-mocks-http";
import { PrismaClient } from "@prisma/client";

describe("usando endpoints", async () => {
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

    test("deve retornar um erro com tarefa inválida", async () => {
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
  });
});
