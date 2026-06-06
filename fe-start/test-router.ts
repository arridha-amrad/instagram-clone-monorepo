import { createRouter } from "@tanstack/react-router";
const router = createRouter({ routeTree: {} as any });
router.subscribe('onBeforeLoad', () => console.log('load start'));
router.subscribe('onLoad', () => console.log('load finish'));
router.subscribe('onResolved', () => console.log('resolved'));
