<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitad913f903c915faada1906658ef0ebc6
{
    public static $prefixLengthsPsr4 = array (
        'O' => 
        array (
            'Osman\\Haider\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Osman\\Haider\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitad913f903c915faada1906658ef0ebc6::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitad913f903c915faada1906658ef0ebc6::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitad913f903c915faada1906658ef0ebc6::$classMap;

        }, null, ClassLoader::class);
    }
}
