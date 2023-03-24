import { Ref, ref, onMounted, onBeforeUnmount } from "vue";

export const useContinuousParallax = (compRef: Ref<HTMLElement>) => {
  const x = ref(0);

  const scrollListener = () => {
    const parent = compRef.value.parentElement;
    const newVal =
      (parent?.offsetHeight! * 0.7 +
        parent?.scrollTop! -
        compRef.value.offsetTop) /
      compRef.value.offsetHeight;

    x.value = Math.min(1.0, Math.max(newVal, 0.0));
  };

  onMounted(() => {
    compRef.value.parentElement?.addEventListener("scroll", scrollListener);
    scrollListener();
  });

  onBeforeUnmount(() => {
    compRef.value.parentElement?.removeEventListener("scroll", scrollListener);
  });

  return x;
};
