import lume from "lume/mod.ts";
import esbuild from "lume/plugins/esbuild.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import terser from "lume/plugins/terser.ts";
import lightningCSS from "lume/plugins/lightningcss.ts";
import sourceMaps from "lume/plugins/source_maps.ts";

const site = lume({
    src: "./src",
});

site.add("presets.json")
    .add("css/main.css")
    .add([".glsl"])
    .add("index.ts")
    .use(esbuild())
    .use(minifyHTML())
    // .use(terser())
    .use(lightningCSS())
    .use(sourceMaps())

export default site;
