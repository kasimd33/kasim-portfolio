"use client";
import { useRef, useEffect, createContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { type Paths, setupSvgRenderer } from "@left4code/svg-renderer";
import { cva, type VariantProps } from "class-variance-authority";
import { Github, Zap } from "lucide-react";

function Frame({
  className,
  paths,
  enableBackdropBlur,
  enableViewBox,
  ...props
}: {
  paths: Paths;
  enableBackdropBlur?: boolean;
  enableViewBox?: boolean;
} & React.ComponentProps<"svg">) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && svgRef.current.parentElement) {
      const instance = setupSvgRenderer({
        el: svgRef.current,
        paths,
        enableBackdropBlur,
        enableViewBox,
      });

      return () => instance.destroy();
    }
  }, [paths, enableViewBox, enableBackdropBlur]);

  return (
    <svg
      {...props}
      className={twMerge(["absolute inset-0 size-full", className])}
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
    />
  );
}

const COLORS = {
  default: {
    stroke1: "#4f46e5",
    fill1: "rgba(79,70,229,0.22)",
    stroke2: "#4f46e5",
    fill2: "rgba(79,70,229,0.1)",
    text: "#ffffff",
  },
};

const buttonVariants = cva(
  "group font-bold mb-2 relative px-8 py-2 cursor-pointer transition-all outline-none [&>span]:relative [&>span]:flex [&>span]:items-center [&>span]:justify-center",
  {
    variants: {
      shape: {
        default: "",
        flat: "",
        simple: "ps-8 pe-6",
      },
    },
    defaultVariants: {
      shape: "default",
    },
  },
);

function FutureButton({
  className,
  children,
  shape = "default",
  enableBackdropBlur = false,
  enableViewBox = false,
  customPaths,
  textColor,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    customPaths?: string[];
    enableBackdropBlur?: boolean;
    enableViewBox?: boolean;
    bgColor?: string;
    textColor?: string;
  }) {
  const colors = COLORS.default;

  return (
    <button
      {...props}
      style={{
        color: textColor || colors.text,
      }}
      className={twMerge(buttonVariants({ shape, className }))}
    >
      <div className="absolute inset-0 -mb-2">
        {!customPaths && (shape === "default" || shape === "flat") && (
          <Frame
            enableBackdropBlur={enableBackdropBlur}
            enableViewBox={enableViewBox}
            paths={[
              {
                show: true,
                style: {
                  strokeWidth: "1",
                  stroke: colors.stroke1,
                  fill: colors.fill1,
                },
                path: [
                  ["M", "17", "0"],
                  ["L", "100% - 7", "0"],
                  ["L", "100% + 0", "0% + 9.5"],
                  ["L", "100% - 18", "100% - 6"],
                  ["L", "4", "100% - 6"],
                  ["L", "0", "100% - 15"],
                  ["L", "17", "0"],
                ],
              },
              {
                show: true,
                style: {
                  strokeWidth: "1",
                  stroke: colors.stroke2,
                  fill: colors.fill2,
                },
                path: [
                  ["M", "9", "100% - 6"],
                  ["L", "100% - 22", "100% - 6"],
                  ["L", "100% - 25", "100% + 0"],
                  ["L", "12", "100% + 0"],
                  ["L", "9", "100% - 6"],
                ],
              },
            ]}
          />
        )}
      </div>
      <span>{children}</span>
    </button>
  );
}

export const MobileMenuContext = createContext<{
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  showMenu: true,
  setShowMenu: () => {},
});

function FutureNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  const primaryStroke = "#4f46e5";
  const primaryFill = "rgba(79, 70, 229, 0.2)";

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <div className="h-16 mt-2 mx-2 lg:-mt-px lg:-mx-px flex w-full top-0 inset-x-0 z-40">
        <div className="size-full relative -mr-[11px] hidden lg:block">
          <Frame
            className="drop-shadow-2xl"
            paths={JSON.parse(
              `[{
                "show": true,
                "style": {"strokeWidth": "1", "stroke": "${primaryStroke}", "fill": "rgba(79,70,229,0.08)"},
                "path":[["M","0","0"],["L","100% - 6","0"],["L","100% - 11","100% - 64"],["L","100% + 0","0% + 29"],["L","0","11"],["L","0","0"]]
              },{
                "show": true,
                "style": {"strokeWidth": "1", "stroke": "${primaryStroke}38", "fill": "transparent"},
                "path":[["M","0","14"],["L","100% - 7","33"]]
              }]`,
            )}
          />
        </div>
        <div className="flex lg:container h-full relative flex-none w-full">
          <div className="flex-none h-full px-14 relative w-full lg:w-auto">
            <Frame
              enableBackdropBlur
              className="drop-shadow-2xl"
              paths={JSON.parse(
                `[{
                  "show":true,
                  "style":{"strokeWidth":"1","stroke":"${primaryStroke}","fill":"${primaryFill}"},
                  "path":[["M","6","0"],["L","100% - 6.5","0"],["L","100% + 0","0% + 9"],["L","100% - 28","100% - 15"],["L","162","100% - 15"],["L","164","100% - 30"],["L","153","100% - 15"],["L","27","100% - 15"],["L","0","0% + 8"],["L","6","0"]]
                },{
                  "show":true,
                  "style":{"strokeWidth":"1","stroke":"${primaryStroke}91","fill":"transparent"},
                  "path":[["M","32","100% - 15"],["L","0% + 152.5","100% - 15"],["L","0% + 163.5","100% - 29"],["L","0% + 161.5","100% - 15"],["L","100% - 32.5","100% - 15"],["L","100% - 36.5","100% - 7"],["L","0% + 163.5","100% - 7"],["L","0% + 165.5","100% - 23"],["L","0% + 152.5","100% - 7"],["L","37","100% - 7"],["L","32","100% - 15"]]
                }]`,
              )}
            />
            <div className="flex items-center mt-2.5 relative">
              <button onClick={() => handleNavClick('#home')} className="me-16 font-bold">
                Portfolio
              </button>
              <div className="hidden lg:flex gap-8 font-medium">
                <button onClick={() => handleNavClick('#about')}>About</button>
                <button onClick={() => handleNavClick('#projects')}>Projects</button>
                <button onClick={() => handleNavClick('#experience')}>Experience</button>
                <button onClick={() => handleNavClick('#contact')}>Contact</button>
              </div>
              <div
                onClick={() => setShowMenu(true)}
                className="cursor-pointer ms-auto flex items-center gap-2 lg:hidden font-medium"
              >
                <Zap className="size-4" />
                Menu
              </div>
            </div>
          </div>
          <div className="w-full relative -ml-[25px] lg:flex justify-end pe-8 hidden">
            <Frame
              enableBackdropBlur
              className="drop-shadow-2xl"
              paths={JSON.parse(
                `[{
                  "show":true,
                  "style":{"strokeWidth":"1","stroke":"${primaryStroke}80","fill":"rgba(79,70,229,0.1)"},
                  "path":[["M","19","0"],["L","100% - 5","0"],["L","100% + 0","0% + 7"],["L","100% - 36","100% - 20"],["L","0","100% - 20"],["L","25","8.999992370605469"],["L","19","1"]]
                },{
                  "show":true,
                  "style":{"strokeWidth":"1","stroke":"${primaryStroke}3B","fill":"transparent"},
                  "path":[["M","25","100% - 14"],["L","100% - 32","100% - 13"],["L","100% - 15","36"]]
                }]`,
              )}
            />
            <div className="flex items-center -mt-3.5">
              <a href="https://github.com" target="_blank">
                <FutureButton shape="flat" className="py-[0.45rem] px-6 ms-1">
                  <Github className="size-4" />
                </FutureButton>
              </a>
            </div>
          </div>
        </div>
        <div className="size-full relative -ml-[18px] hidden lg:block">
          <Frame
            paths={JSON.parse(
              `[{
                "show":true,
                "style":{"strokeWidth":"1","stroke":"${primaryStroke}E6","fill":"rgba(79,70,229,0.08)"},
                "path":[["M","12","0"],["L","100% + 0","0"],["L","100% + 0","0% + 16"],["L","0","100% - 42"],["L","18","7"],["L","12","0"]]
              },{
                "show":true,
                "style":{"strokeWidth":"1","stroke":"${primaryStroke}3B","fill":"transparent"},
                "path":[["M","3","100% - 36"],["L","100% + 0","20"]]
              }]`,
            )}
          />
        </div>
      </div>
    </MobileMenuContext.Provider>
  );
}

export { Frame, FutureButton };
export default FutureNavbar;
export function Navbar() {
  return <FutureNavbar />;
}