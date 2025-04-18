export const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.05 } }, 
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }, 
};

export const leftSplitVariants = {
    initial: { x: "-100%", opacity: 0, skewX: 10 }, 
    animate: { x: 0, opacity: 1, skewX: 0, transition: { duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100, damping: 15 } }, // Reduced duration, increased stiffness, reduced damping
    exit: { x: "-100%", opacity: 0, skewX: 10, transition: { duration: 0.4, ease: "easeInOut" } }, 
};

export const rightSplitVariants = {
    initial: { x: "100%", opacity: 0, scale: 0.7, rotate: 10 },
    animate: { x: 0, opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, ease: "easeOut", type: "spring", stiffness: 90, damping: 10 } }, // Reduced duration, adjusted spring
    exit: { x: "100%", opacity: 0, scale: 0.7, rotate: 10, transition: { duration: 0.5, ease: "easeInOut" } },
};

export const imageVariants = {
    initial: { y: 60, opacity: 0, rotate: -10, scale: 0.8 },
    animate: { y: 0, opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.9, ease: "easeOut", delay: 0.4 } },
    hover: { scale: 1.08, rotate: 5, y: -5, transition: { duration: 0.4, ease: "easeInOut" } },
};

export const titleVariants = {
    initial: { y: -40, opacity: 0, scale: 0.7 },
    animate: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } },
};

export const inputVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut", delay: 0.7, type: "spring", stiffness: 120, damping: 18 } },
};

export const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.9, ease: "easeOut", delay: 0.8 } },
    hover: { scale: 1.1, boxShadow: "0px 7px 14px rgba(0, 0, 0, 0.3)" },
    tap: { scale: 0.9 },
};

export const orLineVariants = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.9 } },
};

export const linkVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 1 } },
    hover: { color: "#00bfff", scale: 1.05, fontWeight: "bold" },
    tap: { scale: 0.95 },
};

export const togglePasswordVariants = {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.8 } },
    hover: { scale: 1.1, color: "#777" },
    tap: { scale: 0.9 },
};

export const backgroundMotion = {
    initial: { x: "-20%", y: "15%", scale: 0.8, opacity: 0 },
    animate: { x: "10%", y: "-10%", scale: 1.2, opacity: 0.3, transition: { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } },
};
