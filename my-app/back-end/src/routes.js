import { Router } from "express";
import controller from "./controllers/controller.js";

const router = Router();

router.get("/teste",controller.Users);
router.post("/login", controller.login);
router.post("/cadastro", controller.cadastro);
router.post('/salvarRespostas', controller.salvarRespostas);

export default router;