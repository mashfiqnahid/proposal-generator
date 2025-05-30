const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const pluginName = 'proposal-generator';
const versionCode = '1.0.0';
const buildDir = path.resolve(__dirname, 'build');
const pluginDir = path.resolve(__dirname, 'dist', pluginName);
const zipPath = path.resolve(__dirname, 'dist', `${pluginName}.zip`);
const phpFile = path.join(pluginDir, `${pluginName}.php`);

// 1. Clean and recreate plugin directory
fs.removeSync(pluginDir);
fs.ensureDirSync(pluginDir);

// 2. Copy React build output
fs.copySync(buildDir, path.join(pluginDir, 'build'));

// 3. Write plugin PHP file
const phpCode = `<?php
/**
 * Plugin Name: Proposal Generator
 * Description: A WordPress plugin powered by React.
 * Version: ${versionCode}
 * Author: MD. Mashfiqur Rahman
 */

defined('ABSPATH') or die('No script kiddies please!');

// Shortcode
function proposal_generator_render_app() {
    return '<div id="proposal-generator"></div>';
}
add_shortcode('profile_generator', 'proposal_generator_render_app');
function proposal_generator_asset($type) {
    $manifest_path = plugin_dir_path(__FILE__) . 'build/asset-manifest.json';
    if (!file_exists($manifest_path)) return false;

    $manifest = json_decode(file_get_contents($manifest_path), true);
    $file = $manifest['files'][$type] ?? null;

    if ($file) {
        return plugin_dir_url(__FILE__) . 'build' . $file;
    }

    return false;
}
// Enqueue scripts
function proposal_generator_enqueue_scripts() {
    $js = proposal_generator_asset('main.js');
    $css = proposal_generator_asset('main.css');

    if ($css) {
        wp_enqueue_style('my-react-plugin-css', $css, [], null);
    }

    if ($js) {
        wp_enqueue_script('my-react-plugin-js', $js, [], null, true);
    }
}
add_action('wp_enqueue_scripts', 'proposal_generator_enqueue_scripts');
`;
fs.writeFileSync(phpFile, phpCode);

// 4. Create a zip of the plugin
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
    console.log(`✅ Plugin built and zipped: ${zipPath} (${archive.pointer()} total bytes)`);
});

archive.on('error', err => { throw err; });

archive.pipe(output);
archive.directory(pluginDir, pluginName);
archive.finalize();
