export enum CommunicationCodes {
    ADD_TRANSLATION = 1,
    UPDATE_TRANSLATION = 2,
    DELETE_TRANSLATION = 3,
    GET_TRANSLATION = 4,

    ADD_CATEGORY = 5,
    GET_CATEGORY = 6,
    UPDATE_CATEGORY = 7,
    DELETE_CATEGORY = 8,
    GET_CATEGORIES = 10,

    ADD_MARKET = 11,
    GET_MARKET = 12,
    UPDATE_MARKET = 13,
    DELETE_MARKET = 14,

    ADD_EVENT = 17,
    GET_EVENT = 18,
    UPDATE_EVENT = 19,
    DELETE_EVENT = 20,
    IS_EVENT = 21,

    ADD_CATEGORY_MAPPING = 22,
    MAP_CATEGORY = 23,
    UN_MAP_CATEGORY = 24,
    UN_MAP_CATEGORY_FOR_ALL_PROVIDERS = 25,
    GET_CATEGORY_MAPPINGS_BY_PROVIDER_ID = 26,
    GET_UNMAPED_CATEGORIES_BY_PROVIDER_ID = 27,

    ADD_MARKET_MAPPING = 28,
    GET_MARKET_MAPPINGS_BY_PROVIDER_ID = 31,
    GET_UNMAPPED_MARKETS_BY_PROVIDER_ID_AND_SPORT_ID = 32,

    ADD_SELECTION_MAPPING = 33,
    MAP_SELECTION = 34,
    UN_MAP_SELECTION = 35,
    GET_SELECTIONS_MAPPINGS_BY_PROVIDER_ID_AND_MARKET_ID = 36,

    MAP_EVENT = 37,
    GET_EVENT_MAPPINGS_BY_PROVIDER_ID_AND_EVENT_ID = 38,
    GET_EVENT_MAPPINGS = 39,

    MAP_EVENT_MARKET = 41,
    MAP_EVENT_SELECTION = 43,

    ADD_PARTICIPANT_MAPPING = 44,

    ADD_PARTICIPANT = 49,
    DELETE_PARTICIPANT = 50,
    GET_PARTICIPANTS_BY_COUNTRY_ID = 53,
    GET_PARTICIPANTS_BY_LEAGUE_ID = 54,

    GET_ALL_PROVIDERS = 55,
    GET_DEFAULT_PROVIDER = 56,

    UPDATE_PARTICIPANT = 57,
    UPDATE_PARTICIPANT_LEAGUES = 58,
    GET_PARTICIPANT_LEAGUES = 59,
    ADD_SELECTION = 60,
    ADD_PARTICIPANT_TO_LEAGUE = 61,
    GET_CATEGORY_MAPPING = 62,
    GET_PARTICIPANT_MAPPING = 63,
    GET_EVENTS = 64,
    MAP_MARKET_WITH_SELECTIONS = 66,
    UN_MAP_EVENT_MARKET_CASCADE_BY_MARKET_ID = 67,
    ADD_EVENT_MARKET = 68,
    ADD_EVENT_SELECTION = 69,
    GET_EVENT_MARKET = 70,
    GET_EVENT_MARKETS = 71,
    GET_EVENT_SELECTION = 72,
    GET_EVENT_MARKET_SELECTIONS = 73,
    GET_EVENT_MARKETS_COUNT = 76,
    GET_EVENT_SELECTIONS_BY_PROVIDER_ID_AND_EVENT_ID = 79,
    CATEGORY_NOT_MAPPED = 80,
    PARTICIPANT_NOT_MAPPED = 81,
    MARKET_NOT_MAPPED = 82,
    SELECTION_NOT_MAPPED = 83,
    DELETE_CATEGORY_WARNING = 84,
    DELETE_PARTICIPANT_WARNING = 85,
    DELETE_MARKET_WARNING = 86,
    DELETE_SELECTION_WARNING = 87,
    GET_CATEGORY_MAPPING_WARNINGS = 88,
    GET_PARTICIPANT_MAPPING_WARNINGS = 89,
    GET_MARKET_MAPPING_WARNINGS = 90,
    GET_SELECTION_MAPPING_WARNINGS = 91,
    GET_WARNINGS_COUNT = 92,
    GET_MARKET_MAPPING = 93,
    MAP_UNMAPPED_EVENT_SELECTIONS = 94,
    UPDATE_MARKET_ORDERS = 97,
    GET_EVENTS_CATEGORIES_BY_TIME = 98,
    GET_CATEGORIES_BY_TIME = 99,
    GET_BEST_ODDS_BY_EVENT_MARKET_ID = 100,
    GET_PROVIDERS_ODDS_BY_SELECTIONS_IDS = 101,
    GET_EVENTS_MARKETS = 103,
    UPLOAD_FILES = 104,
    ADD_USER = 105,
    GET_USER = 106,
    UPDATE_USER = 107,
    REMOVE_USER = 108,
    LOG_IN = 109,
    LOG_OUT = 110,
    PLACE_BET = 111,
    GET_BET_SLIPS = 112,
    GET_BET_SLIP = 113,
    UPDATE_BET_SLIP = 114,
    UPDATE_BET_SLIP_DETAIL = 115,
    GET_BET_SLIP_DETAIL = 116,
    GET_BET_SLIP_DETAILS = 117,
    GET_USER_BETTING_STATISTICS = 118,
    GET_EVENT_MARKET_ODDS = 119,
    GET_EVENT_SELECTIONS_ODDS_BY_PROVIDER = 120,
    GET_EVENT_SELECTIONS_ODDS_BY_ALL_PROVIDERS = 121,
    GET_EVENT_SELECTIONS_BEST_PROVIDER_ODDS = 122,
    GET_PROVIDER_PARTICIPANTS_BY_SPORT_ID = 123,
    SEARCH_PARTICIPANT = 124,
    GET_EVENT_SELECTIONS = 125,
    GET_PROVIDER_LEAGUES_BY_SPORT_ID = 127,
    SEARCH_LEAGUE_BY_SPORT_ID = 128,
    GET_PROVIDER = 129,
    UPDATE_PROVIDER = 130,
    STOP_PROVIDER = 131,
    RESTART_PROVIDER = 132,
    UN_MAP_PARTICIPANT_FOR_ALL_PROVIDERS = 133,
    MOVE_EVENTS_TO_LEAGUE = 134,
    DELETE_LEAGUE_EVENTS = 135,
    DELETE_COUNTRY_EVENTS = 136,
    DELETE_SPORT_EVENTS = 137,
    DELETE_EVENT_MARKETS = 138,
    UN_MAP_EVENTS = 139,
    MERGE_CATEGORIES = 141,
    UN_MAP_EVENT_MARKETS_WITH_SELECTIONS = 140,
    APPEND_MAP_CATEGORY = 142,
    UN_MAP_PROVIDER_CATEGORY = 143,
    GET_USERS = 150,
    DELETE_EVENT_MARKET_BY_MARKET_ID_CASCADE = 152,
    UPDATE_EVENTS_CATEGORY_STATUS = 153,
    PARSER_PING = 154,
    UPDATE_PROVIDERS_ORDER = 155,
    UPDATE_PARTICIPANTS_MAPPINGS = 156,
    GET_EVENTS_WITH_MARKETS_ONLY = 157,
    GET_PARTICIPANT = 158,
    UPDATE_CATEGORY_MAPPING = 159,
    UPDATE_CATEGORY_MAPPINGS = 160,
    GET_SELECTION = 161,
    GET_MARKETS = 162,
    GET_SELECTIONS = 163,
    GET_LEADERBOARD = 164,
    GET_USER_STATISTICS = 165,
    UPDATE_GENERAL_SETTINGS = 166,
    GET_USER_TIPSTER_OBJECTS = 167,
    UPDATE_EVENT_SELECION_RESULT = 168,
    GET_EVENT_SELECTIONS_BY_PROVIDER_ID_AND_PROVIDER_SELECTION_ID = 169,
    UPDATE_EVENT_SELECION_RESULTS = 170,
    GET_EVENTS_PROVIDERS = 171,
    RESULT_EVENT_SELECTIONS = 172,
    GET_EVENT_SELECTION_RESULTS = 173,
    RESULT_EVENT = 174,
    GET_EVENT_RESULT = 175,
    GET_EVENTS_RESULTS = 176,
    UPDATE_EVENT_RESULT = 177,
    UPDATE_EVENTS_RESULTS = 178,
    DELETE_EVENT_RESULT = 179,
    ADD_SCOPE = 180,
    GET_SCOPES = 181,
    UPDATE_SCOPE = 182,
    DELETE_SCOPE = 183,
    ADD_STATISTIC_TYPE = 184,
    GET_STATISTIC_TYPES = 185,
    UPDATE_STATISTIC_TYPE = 186,
    DELETE_STATISTIC_TYPE = 187,
    DELETE_RULE = 188,
    ADD_RULES = 189,
    GET_RULES = 190,
    UPDATE_SCOPES = 191,
    UPDATE_STATISTIC_TYPES = 192,
    UN_MAP_SYSTEM_SELECTION = 193,
    GET_EVENT_SELECTIONS_FOR_ALL_PROVIDERS_BY_EVENT_ID = 194,
    DELETE_PARTICIPANT_EVENTS = 195,
    UPDATE_PARTICIPANT_MAPPING = 196,
    GET_PARTICIPANT_MAPPINGS = 197,
    MAP_PARTICIPANT = 198,
    ADD_COMBINATION_GROUP = 199,
    GET_COMBINATION_GROUP = 200,
    UPDATE_COMBINATION_GROUP = 201,
    DELETE_COMBINATION_GROUP = 202,
    GET_COMBINATION_GROUPS = 203,
    UPDATE_COMBINATION_GROUPS = 204,
    CANCEL_BETS = 205,
    LIST_GENERAL_SETTING = 206,
    DELETE_PARTICIPANTS = 207,
    MOVE_PARTICIPANTS_TO_ANOTHER_LEAGUE = 208,
    ADD_BETSLIP_COMMENT = 209,
    UPDATE_BETSLIP_COMMENT = 210,
    GET_BETSLIP_COMMENT = 211,
    GET_BETSLIP_COMMENTS = 212,
    DELETE_BETSLIP_COMMENT = 213,
    GET_LEADERBOARD_STATISTICS = 214,
    GET_USER_INFO = 216,
    LOG_IN_WORDPRESS = 217,
    REGISTER_USER = 218,
    REGISTER_ADMIN = 219,
    DELETE_USER = 220,
    GET_USER_LOGINS = 221,
    GET_USER_ACTIONS = 222,
    FIND_TOKEN = 223,
    ADD_USER_ACTION = 224,
    GET_PERMISSIONS = 225,
    CREATE_TRANSACTION = 226,
    LIST_TRANSACTIONS = 227,
    ADD_CURRENCY = 228,
    GET_CURRENCY = 229,
    DELETE_CURRENCY = 230,
    LIST_CURRENCIES = 231,
    UPDATE_CURRENCY = 232,
    GET_TRANSACTION = 233,
    GET_USERS_INFOS = 235,
    GET_EVENT_MAP = 236,
    UPDATE_EVENT_STATS = 237,
    ADD_LADDER = 238,
    GET_LADDER = 239,
    UPDATE_LADDER = 249,
    LIST_LADDER = 250,
    DELETE_LADDER = 251,
    UPDATE_LADDERS = 252,
    ADD_NOTIFICATION = 254,
    SEND_NOTIFICATION = 255,
    GET_NOTIFICATION_TEMPLATES = 255,
    GET_NOTIFICATION_TEMPLATE = 256,
    CREATE_NOTIFICATION_TEMPLATE = 257,
    UPDATE_NOTIFICATION_TEMPLATE = 258,
    DELETE_NOTIFICATION_TEMPLATE = 259,
    GET_MARKET_MAPPINGS = 260,
    UPDATE_MARKET_LOADS = 261,
    GET_MARKET_DISPLAY_TYPES = 262,
    GET_MARKET_DISPLAY_TYPE = 263,
    ADD_MARKET_DISPLAY_TYPE = 264,
    EDIT_MARKET_DISPLAY_TYPE = 265,
    EDIT_MARKET_DISPLAY_TYPES = 266,
    DELETE_MARKET_DISPLAY_TYPE = 267,

    GET_USER_GROUP = 268,
    GET_USER_GROUP_LIST = 269,
    ADD_USER_GROUP = 270,
    EDIT_USER_GROUP = 271,
    DELETE_USER_GROUP = 272,
    ADD_USER_TO_GROUP = 273,
    GET_USERS_IN_GROUP = 274,
    REMOVE_USER_FROM_GROUP = 275,
    GET_USER_GROUPS = 276,

    GET_RESTRICTED_IP = 277,
    GET_RESTRICTED_IP_LIST = 278,
    ADD_RESTRICTED_IP = 279,
    EDIT_RESTRICTED_IP = 280,
    DELETE_RESTRICTED_IP = 281,
    GET_USERS_LOGINS_FROM_RESTRICT_IP = 282,

    GET_EVENT_MARKET_RESTRICTIONS = 288,
    ADD_EVENT_MARKET_RESTRICTION = 289,
    EDIT_EVENT_MARKET_RESTRICTIONS = 290,
    DELETE_EVENT_MARKET_RESTRICTIONS = 291,
    DELETE_EVENT_MARKET_RESTRICTION = 292,

    GET_EVENT_SELECTIONS_RESTRICTIONS = 293,
    ADD_EVENT_SELECTIONS_RESTRICTION = 294,
    EDIT_EVENT_SELECTIONS_RESTRICTIONS = 295,
    DELETE_EVENT_SELECTIONS_RESTRICTIONS = 296,
    DELETE_EVENT_SELECTIONS_RESTRICTION = 297,

    GET_MARKET_RESTRICTIONS = 298,
    ADD_MARKET_RESTRICTION = 299,
    EDIT_MARKET_RESTRICTIONS = 300,
    DELETE_MARKET_RESTRICTIONS = 301,
    DELETE_MARKET_RESTRICTION = 302,

    GET_EVENT_RESTRICTIONS = 303,
    ADD_EVENT_RESTRICTION = 304,
    EDIT_EVENT_RESTRICTIONS = 305,
    DELETE_EVENT_RESTRICTIONS = 306,
    DELETE_EVENT_RESTRICTION = 307,

    GET_BET_LIMIT = 308,
    GET_BET_LIMIT_LIST = 309,
    ADD_BET_LIMIT = 310,
    EDIT_BET_LIMIT = 311,
    DELETE_BET_LIMIT = 312,

    VERIFY_USER_HASH = 313,
    CREATE_FORGET_PASSWORD = 314,
    RESET_FORGET_PASSWORD = 315,
    SEND_FORGET_PASSWORD_EMAIL = 316,
    SEND_NEW_PASSWORD_EMAIL = 317,
    UPDATE_CURRENCY_RATES = 318,
    GET_CURRENCY_RATES = 319,

    GET_EMAIL_TEMPLATE = 320,
    GET_EMAIL_TEMPLATE_LIST = 321,
    ADD_EMAIL_TEMPLATE = 322,
    EDIT_EMAIL_TEMPLATE = 323,
    DELETE_EMAIL_TEMPLATE = 324,

    GET_EMAIL = 325,
    GET_EMAIL_LIST = 326,
    ADD_EMAIL = 327,
    EDIT_EMAIL = 328,
    DELETE_EMAIL = 329,
    EDIT_EMAIL_LIST = 330,
    DELETE_EMAIL_LIST = 331,

    ADD_NEW_GROUP = 332,
    GET_GROUPS_LIST = 333,
    UPDATE_GROUP_ID = 334,
    GET_GROUP_ID = 335,
    DELETE_USER_GROUP_ID = 336,
    ADD_USERTO_GROUP = 337,
    DELETE_RISK_GROUP = 338,
    GET_USER_GROUP_BY_ID = 349,

    GET_USER_DATA_TO_AUTOCOMPLETE = 350,
    GET_LATEST_TRANSACTION = 351,

    GET_USER_ADMIN_INFO = 352,
    ADD_SPORT_USER = 353,

    USER_CREATE_BET = 354,

    GET_RISK_GROUPS_BY_USERS_ID_LIST = 355,

    GET_USER_SETTINGS_BY_ID = 356,

    UPDATE_EVENT_MARKETS_FROM_MARKETS = 357,
    UPDATE_EVENT_MARKETS_FROM_EVENTS = 358,
    UPDATE_EVENT_MARKETS_FROM_MARKETS_OR_EVENTS = 359,

    ADD_EVENT_MARKET_HISTORY = 361,
    GET_EVENT_MARKET_HISTORY = 362,
    ADD_EVENT_SELECTION_HISTORY = 363,
    GET_EVENT_SELECTION_HISTORY = 364,
    LIST_EVENT_SELECTIONS_HISTORY = 366,
    ADD_NEW_HISTORY_ITEM = 368,
    GET_WEBSITE_LANGUAGE = 369,
    SET_WEBSITE_LANGUAGE = 370,
    GET_WEBSITE = 372,
    LIST_WEBSITE = 373,
    ADD_WEBSITE = 374,
    UPDATE_WEBSITE = 375,
    DELETE_WEBSITE = 376,

    UPDATE_EVENT_MARKET = 378,
    UPDATE_MARKET_CODE = 379,

    CREATE_SPORT_REGULATION_TYPE = 380,
    UPDATE_SPORT_REGULATION_TYPE = 381,
    LIST_SPORT_REGULATION_TYPE = 382,
    GET_BY_ID_SPORT_REGULATION_TYPE = 383,
    DELETE_SPORT_REGULATION_TYPE = 384,

    GET_LEAGUE_RESTRICTION = 385,
    SET_LEAGUE_RESTRICTION = 386,
    DELETE_LEAGUE_RESTRICTION = 387,

    GET_MARKET_SELECTIONS = 392,
    ADD_MARKET_SELECTIONS = 393,

    UPDATE_CATEGORY_STATUS = 394,

    GET_CATEGORY_CMS = 398,
    UPSERT_CATEGORY_CMS = 399,
    DELETE_CATEGORY_CMS = 400,

    GET_CATEGORY_DYNAMIC_LIMIT = 402,
    UPSERT_CATEGORY_DYNAMIC_LIMIT = 403,
    DELETE_CATEGORY_DYNAMIC_LIMIT = 404,

    GET_CATEGORY_MARKETS = 377,
    GET_LEAGUE_MARKETS_WITH_ALL_CHANNEL = 397,
    UPDATE_LEAGUE_MARKETS_WITH_ALL_CHANNEL = 396,
    DELETE_LEAGUE_MARKETS = 405,

    GET_CATEGORY_NAME = 406,
    UPSERT_CATEGORY_NAME = 407,
    DELETE_CATEGORY_NAME = 408,

    GET_CATEGORY_ORDER = 409,
    UPSERT_CATEGORY_ORDER = 410,
    DELETE_CATEGORY_ORDER = 411,

    GET_CATEGORY_SETTINGS = 412,
    UPSERT_CATEGORY_SETTINGS = 413,
    DELETE_CATEGORY_SETTINGS = 414,

    GET_LEAGUE_TOURNAMENT = 415,
    SET_LEAGUE_TOURNAMENT = 416,
    DELETE_LEAGUE_TOURNAMENT = 417,

    UPDATE_LEAGUE_MARKETS = 418,
    GET_LEAGUE_MARKETS = 419,
    GET_MARKET_NAMES = 420,
    UPDATE_MARKET_NAMES = 421,
    GET_MARKET_ORDERS = 422,
    GET_MARKET_SETTINGS = 423,
    UPDATE_MARKET_SETTINGS = 424,
    GET_MARKET_CMS = 425,
    UPDATE_MARKET_CMS = 426,
    GET_MARKET_DYNAMIC_LIMITS = 427,
    UPDATE_MARKET_DYNAMIC_LIMITS = 428,
    GET_HISTORY = 429,
    GET_PARTICIPANT_NAMES = 430,
    UPDATE_PARTICIPANT_NAMES = 431,

    GET_MARKET_SELECTION = 432,
    ADD_MARKET_SELECTION = 433,
    UPDATE_MARKET_SELECTION = 434,
    DELETE_MARKET_SELECTION = 435,

    GET_MARKET_SELECTION_DYNAMIC_LIMITS = 436,
    UPDATE_MARKET_SELECTION_DYNAMIC_LIMITS = 437,

    GET_MARKET_SELECTION_NAMES = 438,
    UPDATE_MARKET_SELECTION_NAMES = 439,

    GET_MARKET_SELECTION_ORDERS = 440,
    UPDATE_MARKET_SELECTION_ORDERS = 441,

    GET_MARKET_SELECTION_SETTINGS = 442,
    UPDATE_MARKET_SELECTION_SETTINGS = 443,
    GET_LEAGUE_REGULATION_TYPES = 444,
    UPDATE_LEAGUE_REGULATION_TYPES = 445,

    GET_LEAGUE_MARKETS_MARGIN = 446,
    UPDATE_LEAGUE_MARKETS_MARGIN = 447,

    GET_MARKET_HISTORY = 448,
    GET_MARKET_SELECTION_HISTORY = 449,
    GET_CATEGORY_HISTORY = 450,

    GET_PARTICIPANT_COUNTRIES = 451,
    UPDATE_PARTICIPANT_COUNTRIES = 452,

    GET_PARTICIPANT_MEMBER_TANSLATION = 453,
    UPDATE_PARTICIPANT_MEMBER_TANSLATION = 454,

    GET_PARTICIPANT_MEMBERS = 455,
    ADD_PARTICIPANT_MEMBERS_TO_PARTICIPANT = 456,
    GET_PARTICIPANT_MEMBER = 457,
    UPDATE_PARTICIPANT_MEMBER = 458,

    GET_PARTICIPANT_AGE = 459,
    LIST_PARTICIPANT_AGE = 460,
    SET_PARTICIPANT_AGE = 461,
    UPDATE_PARTICIPANT_AGE = 462,
    DELETE_PARTICIPANT_AGE = 463,

    GET_PARTICIPANT_CMS = 464,
    UPDATE_PARTICIPANT_CMS = 465,
    DELETE_PARTICIPANT_CMS = 466,

    GET_PARTICIPANT_MEMBERS_BY_PARTICIPANT = 467,
    ADD_PARTICIPANT_MEMBER = 468,
    DELETE_PARTICIPANT_MEMBER = 469,
    GET_EVENT_CMS = 470,
    UPDATE_EVENT_CMS = 471,
    GET_EVENT_ORDERS = 472,
    UPDATE_EVENT_ORDERS = 473,
    GET_EVENT_DYNAMIC_LIMIT = 474,
    UPDATE_EVENT_DYNAMIC_LIMIT = 475,
    GET_EVENT_SETTINGS = 476,
    UPDATE_EVENT_SETTINGS = 477,
    GET_EVENT_TRANSLATIONS = 478,
    UPDATE_EVENT_TRANSLATIONS = 479,

    LIST_PARTICIPANTS_OF_ADVANCED_FILTER = 480,

    ADD_LANGUAGE = 481,
    EDIT_LANGUAGE = 482,
    GET_LANGUAGE = 483,
    LIST_LANGUAGE = 484,
    DELETE_LANGUAGE = 485,

    UPDATE_EVENT_WON_LIMIT = 486,
    UPDATE_EVENT_STAKE_LIMIT = 487,
    UPDATE_EVENT_MARKET_WON_LIMIT_FROM_EVENT = 488,
    UPDATE_EVENT_MARKET_STAKE_LIMIT_FROM_EVENT = 489,

    UPDATE_EVENT_SELECTION = 491,
    UPDATE_EVENT_MARKET_WON_LIMIT_FROM_MARKET = 492,
    UPDATE_EVENT_MARKET_STAKE_LIMIT_FROM_MARKET = 493,
    UPDATE_EVENT_SELECTION_WON_LIMIT_FROM_SELECTION = 494,
    UPDATE_EVENT_SELECTION_STAKE_LIMIT_FROM_SELECTION = 495,
    DELETE = 496,

    UPDATE_EVENT_SETTINGS_WON_LIMIT = 497,
    UPDATE_EVENT_SETTINGS_STAKE_LIMIT = 498,

    UPDATE_EVENT_MARKET_SETTINGS_WON_LIMIT_FROM_EVENT = 499,
    UPDATE_EVENT_MARKET_SETTINGS_STAKE_LIMIT_FROM_EVENT = 500,

    UPDATE_EVENT_MARKET_SETTINGS_WON_LIMIT_FROM_MARKET = 501,
    UPDATE_EVENT_MARKET_SETTINGS_STAKE_LIMIT_FROM_MARKET = 502,

    GET_EVENT_MARKET_SETTINGS = 503,
    UPSERT_EVENT_MARKET_SETTINGS = 504,

    GET_EVENT_SELECTION_SETTINGS = 505,
    UPSERT_EVENT_SELECTION_SETTINGS = 506,

    UPDATE_EVENT_SELECTION_SETTINGS_WON_LIMIT_FROM_MARKET = 507,
    UPDATE_EVENT_SELECTION_SETTINGS_STAKE_LIMIT_FROM_MARKET = 508,

    GET_EVENT_MARKET_DYNAMIC_LIMIT = 509,
    UPDATE_EVENT_MARKET_DYNAMIC_LIMIT = 510,

    GET_EVENT_SELECTION_DYNAMIC_LIMIT = 511,
    UPDATE_EVENT_SELECTION_DYNAMIC_LIMIT = 512,

    IK_LIST_ACCOUNTS = 513,
    IK_GET_ACCOUNT = 514,
    IK_CHECKOUT = 515,
    IK_CHECKOUT_ID = 516,
    IK_CO_INVOICE = 517,
    IK_CO_INVOICE_ID = 518,
    IK_CARRENCY = 519,
    IK_CARRENCY_ID = 520,
    IK_PAYSYSTEM_INPUT_PAYWAY = 521,
    IK_PAYSYSTEM_INPUT_PAYWAY_ID = 522,
    IK_PAYSYSTEM_OUTPUT_PAYWAY = 523,
    IK_PAYSYSTEM_OUTPUT_PAYWAY_ID = 524,
    IK_PURSE = 525,
    IK_PURSE_ID = 526,
    IK_GET_WITHDRAW = 527,
    IK_POST_WITHDRAW = 528,
    IK_GET_WITHDRAW_ID = 529,

    UPDATE_EVENT_MARKET_MARGIN = 530,
    UPDATE_EVENT_MARKET_TRANSLATION = 531,

    GET_EVENTS_MARKETS_BY_MARKET = 532,
    UPDATE_EVENT_MARKET_ORDER = 533,
    UPDATE_EVENT_SELECTION_TRANSLATION = 534,
    UPDATE_EVENT_SELECTION_ORDER = 535,
    UPDATE_EVENT_SELECTION_ODD = 536,

    LIST_USER_FAVORITE_CATEGORY = 537,
    ADD_USER_FAVORITE_CATEGORY = 538,
    REMOVE_USER_FAVORITE_CATEGORY = 539,

    UPDATE_EVENT_SETTINGS_BET_DELAY = 540,
    UPDATE_EVENT_SETTINGS_ACCEPT_BETS = 541,

    GET_EVENT_SELECTION_TO_CACHE = 542,

    LIST_OF_SECRET_QUESTIONS = 543,
    SET_USER_QUESTION_AND_ANSWER = 544,
    ASK_USER_SECRET = 545,
    CHECK_USER_HASH = 546,
    CHANGE_PASSWORD = 547,
    RESET_PASSWORD = 548,
    LIST_SECRET_QUESTIONS = 549,
    ADD_SECRET_QUESTION = 550,
    REMOVE_SECRET_QUESTION = 551,

    CANCEL_EVENT_MARKET = 552,
    DELETE_EVENT_MARKET_FROM_CACHE = 553,
    CANCEL_EVENT_SELECTION = 554,
    DELETE_EVENT_SELECTION_FROM_CACHE = 555,
    GET_EVENT_SELECTIONS_BY_FILTER = 556,
    SEND_EMAIL_NEW_IP_LOGIN = 557,
    SEND_EMAIL_REGISTRATION = 558,
    SEND_EMAIL_FORGET_PASSWORD = 559,
    PAYMENT = 560,
    VERIFY_BY_SMS = 561,

    DELETE_EVENT_SELECTION_BY_SELECTION_ID_CASCADE = 562,

    ACTIVATE_MARKET = 563,
    ACTIVATE_MARKET_SELECTION = 564,

    ACTIVATE_EVENT_MARKETS_BY_MARKET_ID_CASCADE = 565,
    ACTIVATE_EVENT_SELECTIONS_BY_SELECTION_ID_CASCADE = 566,

    CHECK_ACTIVE_BET_BY_FILTER = 567,
    START_DEPOSIT = 568,

    UPDATE_EVENT_SELECTIONS_FROM_SELECTION = 569,

    PAYMENT_SUCCESS = 570,
    PAYMENT_FAIL = 571,
    PAYMENT_PENDING = 572,
    PAYMENT_INTERACT = 573,

    RTM_GET_BET_SLIPS = 574,
    RTM_GET_DEPOSITS = 575,
    RTM_GET_WITHDRAWALS = 576,
    RTM_GET_WITHDRAWAL = 577,
    CREATE_USER_BET_NUMBER = 578,
    GET_ADMIN_RTM_SETTINGS = 579,
    SET_ADMIN_RTM_SETTINGS = 580,

    GET_MENU = 581,
    UPDATE_MENU = 582,
    CREATE_MENU_COLUMN = 583,
    UPDATE_MENU_COLUMN = 584,
    UPDATE_MENU_COLUMNS_ORDER = 585,
    CREATE_MENU_COLUMN_ITEM = 586,
    UPDATE_MENU_COLUMN_ITEM = 587,
    UPDATE_MENU_COLUMN_ITEMS_ORDER = 588,

    LIST_NEWS = 590,
    GET_NEWS = 591,
    CREATE_NEWS = 592,
    UPDATE_NEWS = 593,
    DELETE_NEWS = 594,

    CREATE_NEWS_DETAIL = 595,
    UPDATE_NEWS_DETAIL = 596,
    DELETE_NEWS_DETAIL = 597,

    GET_INFORMATION_PAGE = 598,
    GET_INFORMATION_PAGES = 599,
    CREATE_INFORMATION_PAGE = 600,
    UPDATE_INFORMATION_PAGE = 601,

    CHANGE_USER_ONLINE_STATUS = 602,

    GET_MENU_REVISIONS = 603,
    CREATE_MENU_REVISION = 604,
    APPLY_MENU_REVISION = 605,
    GET_FILTERED_LADDERS = 606,

    GET_INFO_PAGE_REVISIONS = 607,
    CREATE_INFO_PAGE_REVISION = 608,
    APPLY_INFO_PAGE_REVISION = 609,

    GET_ADMIN_SIDEBAR_SETTING = 610,
    SET_ADMIN_SIDEBAR_SETTING = 611,

    BET_REVIEW_UPDATE = 612,
    GET_BANNER = 613,
    ADD_BANNER_GROUP = 614,
    GET_BANNER_GROUP = 615,

    ADD_BANNER = 616,
    DELETE_INFORMATION_PAGE = 617,

    RTM_GET_BET_SLIP = 618,
    GET_PAYMENTS = 619,
    ACTIVE_PAYMENTS = 620,

    CREATE_PAYMENT = 621,
    GET_PAYMENT = 622,
    LIST_PAYMENT = 623,
    UPDATE_PAYMENT = 624,
    DELETE_PAYMENT = 625,

    CREATE_WEBSITE_PAYMENT = 626,
    GET_WEBSITE_PAYMENT = 627,
    LIST_WEBSITE_PAYMENT = 628,
    UPDATE_WEBSITE_PAYMENT = 629,
    DELETE_WEBSITE_PAYMENT = 630,
    ADD_EVENT_STATISTIC = 631,
    GET_EVENT_STATISTIC = 632,
    GET_EVENTS_STATISTICS = 633,
    UPDATE_EVENT_MARKET_RESOLUTION = 634,
    UPDATE_EVENT_STATISTIC = 635,
    UPDATE_EVENTS_STATISTICS = 636,
    DELETE_EVENT_STATISTICS = 637,

    GET_EVENT_HISTORY = 638,
}