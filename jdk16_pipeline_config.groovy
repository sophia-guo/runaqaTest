class Config16 {
  final Map<String, Map<String, ?>> buildConfigurations = [
        x64Mac    : [
                os                  : 'mac',
                arch                : 'x64',
                additionalNodeLabels: 'macos10.14',
                test                : [
                        nightly: false,
                        release: ['sanity.openjdk', 'sanity.system', 'extended.system', 'sanity.perf']
                ],
                configureArgs       : '--enable-dtrace'
        ],

        x64Linux  : [
                os                  : 'linux',
                arch                : 'x64',
                dockerImage         : 'adoptopenjdk/centos7_build_image',
                dockerFile: [
                        openj9  : 'pipelines/build/dockerFiles/cuda.dockerfile'
                ],
                test                : [
                        nightly: false,
                        release: ['sanity.openjdk', 'sanity.system', 'extended.system', 'sanity.perf', 'sanity.external', 'special.functional']
                ],
                configureArgs       : [
                        "openj9"      : '--enable-dtrace --enable-jitserver',
                        "hotspot"     : '--enable-dtrace'
                ]
        ],

        // Currently we have to be quite specific about which windows to use as not all of them have freetype installed
        x64Windows: [
                os                  : 'windows',
                arch                : 'x64',
                additionalNodeLabels: [
                        hotspot: 'win2012&&vs2017'
                ],
                buildArgs : [
                        hotspot : '--jvm-variant client,server'
                ],
                test                : [
                        nightly: false,
                        release: ['sanity.openjdk', 'sanity.perf', 'sanity.system', 'extended.system']
                ]
        ],

        ppc64Aix    : [
                os                  : 'aix',
                arch                : 'ppc64',
                additionalNodeLabels: [
                        hotspot: 'xlc16&&aix710',
                        openj9:  'xlc16&&aix715'
                ],
                test                : [
                        nightly: false,
                        release: ['sanity.openjdk', 'sanity.system', 'extended.system']
                ]
        ],


        s390xLinux    : [
                os                  : 'linux',
                arch                : 's390x',
                test                : [
                        nightly: false,
                        release: ['sanity.openjdk', 'sanity.system', 'extended.system', 'sanity.perf']
                ],
                configureArgs       : '--enable-dtrace'
        ],

        ppc64leLinux    : [
                os                  : 'linux',
                arch                : 'ppc64le',
                test                : [
                        nightly: false,
                        release: ['sanity.openjdk', 'sanity.system', 'extended.system', 'sanity.perf']
                ],
                configureArgs       : [
                        "hotspot"     : '--enable-dtrace',
                        "openj9"      : '--enable-dtrace --enable-jitserver'
                ]

        ],

        aarch64Linux    : [
                os                  : 'linux',
                arch                : 'aarch64',
                dockerImage         : 'adoptopenjdk/centos7_build_image',
                test                : [
                        nightly: false,
                        release: ['sanity.openjdk', 'sanity.system', 'extended.system', 'sanity.perf']
                ],
                configureArgs       : '--enable-dtrace'
        ],
  ]

}

Config16 config = new Config16()
return config.buildConfigurations
