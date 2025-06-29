<?php

if (!function_exists('resource_path')) {
    /**
     * Get the path to the resources directory.
     *
     * @param  string  $path
     * @return string
     */
    function resource_path($path = '')
    {
        return app()->resourcePath($path);
    }
}

if (!function_exists('storage_path')) {
    /**
     * Get the path to the storage directory.
     *
     * @param  string  $path
     * @return string
     */
    function storage_path($path = '')
    {
        return app()->storagePath($path);
    }
} 