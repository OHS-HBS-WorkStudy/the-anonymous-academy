export const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut", delayChildren: 0.4, staggerChildren: 0.1 } },
};

export const splitRightVariants = {
    initial: { opacity: 0, x: "50vw", rotate: 10, zIndex: -2, },
    animate: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const imageVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -5 },
    animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};

export const titleVariants = {
    initial: { opacity: 0, y: -30, skewY: 5 },
    animate: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.3 } },
};

export const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const buttonGroupVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { delay: 0.5, ease: "easeOut" } },
};

export const buttonVariants = {
    initial: { scale: 0.9 },
    hover: { scale: 1.1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
};

export const submitButtonVariants = {
    initial: { opacity: 0, scale: 0.8, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5,ease: "easeOut", delay: 0.6 } },
    hover: { scale: 1.05, backgroundColor: "#007bff", color: "white", boxShadow: "0px 7px 12px rgba(0, 0, 0, 0.25)" },
    tap: { scale: 0.98 },
};

export const orLineVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.7 } },
};

export const loginContainerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.8 } },
};

export const fadeVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.8 } },
}
