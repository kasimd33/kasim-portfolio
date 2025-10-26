'use client';

import React, { useRef, useId, useEffect, CSSProperties, useState } from 'react';
import { animate, useMotionValue, AnimationPlaybackControls } from 'framer-motion';

// Type definitions
interface ResponsiveImage {
    src: string;
    alt?: string;
    srcSet?: string;
}

interface AnimationConfig {
    preview?: boolean;
    scale: number;
    speed: number;
}

interface NoiseConfig {
    opacity: number;
    scale: number;
}

interface ShadowOverlayProps {
    type?: 'preset' | 'custom';
    presetIndex?: number;
    customImage?: ResponsiveImage;
    sizing?: 'fill' | 'stretch';
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

function mapRange(
    value: number,
    fromLow: number,
    fromHigh: number,
    toLow: number,
    toHigh: number
): number {
    if (fromLow === fromHigh) {
        return toLow;
    }
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
    const id = useId();
    const cleanId = id.replace(/:/g, "");
    const instanceId = `shadowoverlay-${cleanId}`;
    return instanceId;
};

export function ShadowOverlay({
    sizing = 'fill',
    color = 'rgba(128, 128, 128, 1)',
    animation,
    noise,
    style,
    className,
    children
}: ShadowOverlayProps) {
    const id = useInstanceId();
    const animationEnabled = Boolean(animation && animation.scale > 0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const localAnimationEnabled = animationEnabled && !reducedMotion;
    const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
    const hueRotateMotionValue = useMotionValue(180);
    const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

    // Make displacement and timing mappings more perceptible:
    // - larger `scale` => larger displacement
    // - larger `speed` => faster animation (smaller duration)
    const displacementScale = animation ? mapRange(animation.scale, 0, 100, 8, 140) : 0;
    const animationDuration = animation ? mapRange(animation.speed, 1, 100, 20, 4) : 1; // seconds

    useEffect(() => {
        // Respect user preference for reduced motion
        let mq: MediaQueryList | null = null;
        try {
            if (typeof window !== 'undefined' && 'matchMedia' in window) {
                mq = window.matchMedia('(prefers-reduced-motion: reduce)');
                setReducedMotion(mq.matches);
                const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
                if (mq.addEventListener) {
                    mq.addEventListener('change', handler);
                } else if ((mq as any).addListener) {
                    (mq as any).addListener(handler);
                }
            }
        } catch (err) {
            // ignore
        }

        if (feColorMatrixRef.current && localAnimationEnabled) {
            if (hueRotateAnimation.current) {
                hueRotateAnimation.current.stop();
            }
            hueRotateMotionValue.set(0);
            hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
                duration: animationDuration,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
                ease: "linear",
                delay: 0,
                onUpdate: (value: number) => {
                    if (feColorMatrixRef.current) {
                        feColorMatrixRef.current.setAttribute("values", String(value));
                    }
                }
            });

            return () => {
                if (hueRotateAnimation.current) {
                    hueRotateAnimation.current.stop();
                }
                // cleanup media query listener
                try {
                    if (mq) {
                        if (mq.removeEventListener) {
                            mq.removeEventListener('change', (e: MediaQueryListEvent) => setReducedMotion(e.matches));
                        } else if ((mq as any).removeListener) {
                            (mq as any).removeListener((e: MediaQueryListEvent) => setReducedMotion(e.matches));
                        }
                    }
                } catch (err) {
                    // ignore
                }
            };
        }
    }, [localAnimationEnabled, animationDuration, hueRotateMotionValue]);

    return (
        <div
            className={className}
            style={{
                overflow: "hidden",
                position: "relative",
                width: "100%",
                height: "100%",
                ...style
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: -displacementScale,
                    filter: localAnimationEnabled ? `url(#${id}) blur(4px)` : "none",
                    transition: 'filter 0.3s ease'
                }}
            >
                {animationEnabled && (
                    <svg style={{ position: "absolute" }}>
                        <defs>
                            <filter id={id}>
                                <feTurbulence
                                    result="undulation"
                                    numOctaves="2"
                                    // baseFrequency scales with `animation.scale` so higher scale gives more visible undulation
                                    baseFrequency={`${mapRange(animation?.scale ?? 0, 0, 100, 0.002, 0.02)},${mapRange(animation?.scale ?? 0, 0, 100, 0.01, 0.04)}`}
                                    seed="1"
                                    type="turbulence"
                                />
                                <feColorMatrix
                                    ref={feColorMatrixRef}
                                    in="undulation"
                                    type="hueRotate"
                                    values="0"
                                />
                                <feColorMatrix
                                    in="dist"
                                    result="circulation"
                                    type="matrix"
                                    values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="circulation"
                                    scale={displacementScale}
                                    result="dist"
                                />
                                <feDisplacementMap
                                    in="dist"
                                    in2="undulation"
                                    scale={Math.max(4, Math.floor(displacementScale / 2))}
                                    result="output"
                                />
                            </filter>
                        </defs>
                    </svg>
                )}
                <div
                    style={{
                        // Prefer a gradient overlay fallback (better cross-browser support).
                        background: `linear-gradient(135deg, ${color} 0%, rgba(0,0,0,0) 60%)`,
                        WebkitMaskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
                        maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
                        maskSize: sizing === "stretch" ? "100% 100%" : "cover",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        width: "100%",
                        height: "100%",
                        transition: 'opacity 0.4s ease'
                    }}
                />
            </div>

            {children && (
                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        width: "100%",
                        height: "100%"
                    }}
                >
                    {children}
                </div>
            )}

            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
                        backgroundSize: noise.scale * 200,
                        backgroundRepeat: "repeat",
                        opacity: noise.opacity / 2,
                        zIndex: 5
                    }}
                />
            )}
        </div>
    );
}