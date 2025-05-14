
const mockData = {
    tests: [
        {
            name: 'Smart wait on all UI Actions/Operations',
            description:
                'User is verifying the cookies set on Salesforce page, and extracts the domain from the logged-in URL. User captures the full HTML and asserts the correct domain, and creates a module.',
            test_id: 'tc_10',
            priority: 'p1',
            duration: '00:05:00',
            start_time: '1746492076',
            end_time: '1746492196',
            build_id: '123',
            build_name: 'Build 1',
            env: 'stage',
            links: [
                {
                    kane: {
                        auteur_test_id: 'abcd',
                        domain: 'https://www.lambdatest.com/',
                        description: 'KANE',
                    },
                },
                {
                    hyper_execute: {
                        job_id: 'abcd',
                        url: 'https://www.lambdatest.com/',
                        description: 'HE',
                    },
                },
                {
                    automation: {
                        automation_test_id: 'abcd',
                        url: 'https://www.lambdatest.com/',
                        description: 'ML',
                    },
                },
                {
                    sumo: {
                        test_id: 'tc_10',
                        url: 'https://service.sumologic.com/ui/#/search/create?query=_source%3Dkaneai_qa_logs%20%22{test_id}%22&startTime={startTime}000&endTime={endTime}000',
                        description: 'SUMO',
                    },
                },
            ],
            module: ['smart wait', 'scrollable content', 'upload file', 'click'],
            result: {
                status: 'failed',
                message:
                    'API request failed with status code 500: Internal Server Error',
                stacktrace: [
                    {
                        file: 'api_client.py',
                        line: 45,
                        function: 'send_request',
                        code: 'response = requests.post(url, json=payload, headers=headers)',
                    },
                    {
                        file: 'test_api.py',
                        line: 30,
                        function: 'test_create_session',
                        code: "result = api_client.send_request('/create-session', payload)",
                    },
                    {
                        file: 'runner.py',
                        line: 15,
                        function: 'run_test_case',
                        code: 'test_result = test_case()',
                    },
                    {
                        file: 'main.py',
                        line: 10,
                        function: 'main',
                        code: 'runner.run_test_case(test_id)',
                    },
                ],
            },
            pre: [
                {
                    name: 'Create new authoring session',
                    uses: {
                        function: 'create_authoring_session',
                        args: {
                            agent_type: 'web',
                            region: 'us',
                            proxy: {
                                tunnel_name: 'abcd-123',
                            },
                        },
                    },
                    result: {
                        status: 'passed',
                        message: 'Authoring session created successfully.',
                        duration: '00:00:45',
                        aiAnalysis: 'Successfully created a new authoring session with the specified configuration. The proxy tunnel setup was verified and the session was initialized correctly.'
                    },
                },
            ],
            steps: [
                {
                    name: 'Navigate to smart wait page',
                    uses: {
                        function: 'execute_instruction',
                        args: {
                            instruction:
                                'go to https://stage-auteur-app.lambdatestinternal.com/scenarios/scroll_smart_wait_10.html',
                            execute_in_sync: true,
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'url_checker',
                                args: {
                                    value: 'https://www.lambdatest.com/',
                                    match: 'exact',
                                },
                            },
                        },
                    ],
                    coverage_validator: {
                        dom: ['Nested iFrame', 'Shadow Dom', 'Slot Elements'],
                    },
                    result: {
                        status: 'passed',
                        message: 'Navigation to the smart wait page was successful.',
                        duration: '00:01:00',
                        aiAnalysis: 'Step executed successfully with all assertions passing. The DOM state was verified and the action completed as expected.'
                    },
                },
                {
                    name: 'Click on Random API Calls',
                    uses: {
                        function: 'execute_instruction',
                        args: {
                            instruction: 'click on start button in Random API Calls',
                            execute_in_sync: true,
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'driver_js_executor',
                                args: {
                                    value: 'Start button clicked',
                                    match: 'equals',
                                },
                            },
                        },
                        {
                            uses: {
                                function: 'dom_extractor',
                                args: {
                                    locator: '//html/body/div',
                                    text: 'Random API Calls',
                                    match: 'equals',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'failed',
                        message: 'Failed to click on the start button in Random API Calls.',
                        duration: '00:02:00',
                        aiAnalysis: 'The failure appears to be due to a timing issue. The element was not ready when the click action was attempted. Consider adding an explicit wait condition or increasing the smart wait timeout.'
                    },
                },
                {
                    name: 'Click on "click me" button for flood api',
                    uses: {
                        function: 'execute_instruction',
                        args: {
                            instruction: 'click on Click Me button for flood api',
                            execute_in_sync: true,
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'driver_js_executor',
                                args: {
                                    value: 'Click Me button clicked',
                                    match: 'equals',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Click Me button for flood API was clicked successfully.',
                        duration: '00:03:00',
                        aiAnalysis: 'Step executed successfully with all assertions passing. The DOM state was verified and the action completed as expected.'
                    },
                },
                {
                    name: 'Type duration and enter the delay',
                    uses: {
                        function: 'execute_instruction',
                        args: {
                            instruction:
                                'type 5000 in duration field and 2000 in delay field',
                            execute_in_sync: true,
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'driver_js_executor',
                                args: {
                                    value: 2000,
                                    match: 'equals',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Duration and delay were entered successfully.',
                        duration: '00:04:00',
                        aiAnalysis: 'Step executed successfully with all assertions passing. The DOM state was verified and the action completed as expected.'
                    },
                },
                {
                    name: 'Click on Load Posts in Scrollable Content',
                    uses: {
                        function: 'execute_instruction',
                        args: {
                            instruction: 'click on Load Posts in Scrollable Content',
                            execute_in_sync: true,
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'driver_js_executor',
                                args: {
                                    value: 'Load Posts button clicked',
                                    match: 'equals',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Load Posts button was clicked successfully.',
                        duration: '00:05:00',
                        aiAnalysis: 'Step executed successfully with all assertions passing. The DOM state was verified and the action completed as expected.'
                    },
                },
                {
                    name: 'Scroll to the bottom in Load Scrollable Content section',
                    uses: {
                        function: 'execute_instruction',
                        args: {
                            instruction:
                                'scroll to the bottom in Load Scrollable Content section',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'driver_js_executor',
                                args: {
                                    value: 'Scrollable Content section scrolled to the bottom',
                                    match: 'equals',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message:
                            'Scrolled to the bottom of the Load Scrollable Content section.',
                        duration: '00:06:00',
                        aiAnalysis: 'Step executed successfully with all assertions passing. The DOM state was verified and the action completed as expected.'
                    },
                },
                {
                    name: 'Upload txt File',
                    uses: {
                        function: 'upload_file',
                        args: {
                            file_path: 'TextFile.txt',
                            file_name: 'TextFile.txt',
                        },
                    },
                    result: {
                        status: 'passed',
                        message: 'Text file was uploaded successfully.',
                        duration: '00:07:00',
                        aiAnalysis: 'Step executed successfully with all assertions passing. The DOM state was verified and the action completed as expected.'
                    },
                },
                {
                    name: 'Click on Upload File button',
                    uses: {
                        function: 'execute_instruction',
                        args: {
                            instruction: 'upload',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'driver_js_executor',
                                args: {
                                    value: 'Upload File button clicked',
                                    match: 'equals',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Upload File button was clicked successfully.',
                        duration: '00:08:00',
                        aiAnalysis: 'Step executed successfully with all assertions passing. The DOM state was verified and the action completed as expected.'
                    },
                },
            ],
            post: [
                {
                    name: 'Save authoring session',
                    uses: {
                        function: 'save_authoring_session',
                        args: {
                            project_name: 'scenario 1',
                            folder_name: 'scneario 1',
                            test_name: 'Smart wait on all UI Actions/Operations.',
                            description: 'Smart wait on all UI Actions/Operations.',
                            type: 'regression',
                            status: 'ready',
                        },
                    },
                    result: {
                        status: 'passed',
                        message: 'Authoring session saved successfully.',
                        duration: '00:00:30',
                        aiAnalysis: 'Session was successfully saved with all metadata intact. The test artifacts were properly stored and indexed for future reference.'
                    },
                },
            ],
            history: [
                {
                    build_id: '141',
                    status: 'passed',
                },
                {
                    build_id: '142',
                    status: 'failed',
                },
                {
                    build_id: '143',
                    status: 'failed',
                },
                {
                    build_id: '144',
                    status: 'passed',
                },
                {
                    build_id: '145',
                    status: 'passed',
                },
                {
                    build_id: '146',
                    status: 'failed',
                },
                {
                    build_id: '147',
                    status: 'passed',
                },
                {
                    build_id: '148',
                    status: 'passed',
                },
                {
                    build_id: '149',
                    status: 'passed',
                },
                {
                    build_id: '150',
                    status: 'passed',
                },
            ],
        },
        {
            name: 'Verify user login and dashboard functionality',
            description:
                'User logs into the application, verifies the dashboard widgets, and checks the user profile settings.',
            test_id: 'tc_20',
            priority: 'p0',
            duration: '00:03:45',
            start_time: '1746492076',
            end_time: '1746492196',
            build_id: '123',
            build_name: 'Build 1',
            env: 'stage',
            links: [
                {
                    kane: {
                        auteur_test_id: 'efgh',
                        domain: 'https://www.example.com/',
                        description: 'KANE',
                    },
                },
                {
                    hyper_execute: {
                        job_id: 'efgh',
                        url: 'https://www.example.com/',
                        description: 'HE',
                    },
                },
                {
                    automation: {
                        automation_test_id: 'efgh',
                        url: 'https://www.example.com/',
                        description: 'ML',
                    },
                },
                {
                    sumo: {
                        test_id: 'tc_20',
                        url: 'https://service.sumologic.com/ui/#/search/create?query=_source%3Dkaneai_qa_logs%20%22{test_id}%22&startTime={startTime}000&endTime={endTime}000',
                        description: 'SUMO',
                    },
                },
            ],
            module: [
                'login',
                'dashboard',
                'profile settings',
                'upload file',
                'click',
            ],
            result: {
                status: 'passed',
                message: 'All steps executed successfully.',
                stacktrace: [],
            },
            pre: [
                {
                    function: 'initialize_test_environment',
                    args: {
                        browser: 'chrome',
                        version: 'latest',
                        os: 'windows',
                    },
                    result: {
                        status: 'passed',
                        message: 'Test environment initialized successfully.',
                    },
                },
            ],
            steps: [
                {
                    name: 'Open login page',
                    uses: {
                        function: 'navigate_to_url',
                        args: {
                            url: 'https://www.example.com/login',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'url_checker',
                                args: {
                                    value: 'https://www.example.com/login',
                                    match: 'exact',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Login page opened successfully.',
                    },
                },
                {
                    name: 'Enter login credentials',
                    uses: {
                        function: 'fill_form',
                        args: {
                            username: 'test_user',
                            password: 'password123',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'form_validator',
                                args: {
                                    field: 'username',
                                    value: 'test_user',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Login credentials entered successfully.',
                    },
                },
                {
                    name: 'Verify dashboard widgets',
                    uses: {
                        function: 'check_dashboard_widgets',
                        args: {
                            widgets: ['sales', 'performance', 'tasks'],
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'widget_checker',
                                args: {
                                    widget: 'sales',
                                    exists: true,
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Dashboard widgets verified successfully.',
                    },
                },
                {
                    name: 'Update profile settings',
                    uses: {
                        function: 'update_profile',
                        args: {
                            email: 'test_user@example.com',
                            phone: '1234567890',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'profile_validator',
                                args: {
                                    field: 'email',
                                    value: 'test_user@example.com',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Profile settings updated successfully.',
                    },
                },
            ],
            post: [
                {
                    function: 'logout_user',
                    args: {},
                    result: {
                        status: 'passed',
                        message: 'User logged out successfully.',
                    },
                },
            ],
            history: [
                {
                    build_id: '141',
                    status: 'passed',
                },
                {
                    build_id: '142',
                    status: 'skipped',
                },
                {
                    build_id: '143',
                    status: 'failed',
                },
                {
                    build_id: '144',
                    status: 'failed',
                },
                {
                    build_id: '145',
                    status: 'failed',
                },
                {
                    build_id: '146',
                    status: 'failed',
                },
                {
                    build_id: '147',
                    status: 'failed',
                },
                {
                    build_id: '148',
                    status: 'skipped',
                },
                {
                    build_id: '149',
                    status: 'failed',
                },
                {
                    build_id: '150',
                    status: 'failed',
                },
            ],
        },
        {
            name: 'Verify search functionality on e-commerce site',
            description:
                'User searches for a product, filters the results by category, and verifies the product details page.',
            test_id: 'tc_30',
            priority: 'p2',
            duration: '00:04:30',
            start_time: '1746492076',
            end_time: '1746492196',
            build_id: '123',
            build_name: 'Build 1',
            env: 'stage',
            links: [
                {
                    kane: {
                        auteur_test_id: 'ijkl',
                        domain: 'https://www.ecommerce.com/',
                        description: 'KANE',
                    },
                },
                {
                    hyper_execute: {
                        job_id: 'ijkl',
                        url: 'https://www.ecommerce.com/',
                        description: 'HE',
                    },
                },
                {
                    automation: {
                        automation_test_id: 'ijkl',
                        url: 'https://www.ecommerce.com/',
                        description: 'ML',
                    },
                },
                {
                    sumo: {
                        test_id: 'tc_30',
                        url: 'https://service.sumologic.com/ui/#/search/create?query=_source%3Dkaneai_qa_logs%20%22{test_id}%22&startTime={startTime}000&endTime={endTime}000',
                        description: 'SUMO',
                    },
                },
            ],
            module: ['search', 'filter', 'product details', 'click'],
            result: {
                status: 'passed',
                message: 'All steps executed successfully.',
                stacktrace: [],
            },
            pre: [
                {
                    function: 'initialize_test_environment',
                    args: {
                        browser: 'firefox',
                        version: 'latest',
                        os: 'macos',
                    },
                    result: {
                        status: 'passed',
                        message: 'Test environment initialized successfully.',
                    },
                },
            ],
            steps: [
                {
                    name: 'Open e-commerce homepage',
                    uses: {
                        function: 'navigate_to_url',
                        args: {
                            url: 'https://www.ecommerce.com/',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'url_checker',
                                args: {
                                    value: 'https://www.ecommerce.com/',
                                    match: 'exact',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'E-commerce homepage opened successfully.',
                    },
                },
                {
                    name: 'Search for a product',
                    uses: {
                        function: 'fill_form',
                        args: {
                            search_query: 'laptop',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'form_validator',
                                args: {
                                    field: 'search_query',
                                    value: 'laptop',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Search query entered successfully.',
                    },
                },
                {
                    name: 'Filter results by category',
                    uses: {
                        function: 'apply_filter',
                        args: {
                            category: 'electronics',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'filter_validator',
                                args: {
                                    filter: 'category',
                                    value: 'electronics',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Results filtered by category successfully.',
                    },
                },
                {
                    name: 'Verify product details page',
                    uses: {
                        function: 'navigate_to_product',
                        args: {
                            product_id: '12345',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'product_validator',
                                args: {
                                    product_id: '12345',
                                    exists: true,
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Product details page verified successfully.',
                    },
                },
            ],
            post: [
                {
                    function: 'logout_user',
                    args: {},
                    result: {
                        status: 'passed',
                        message: 'User logged out successfully.',
                    },
                },
            ],
            history: [
                {
                    build_id: '141',
                    status: 'skipped',
                },
                {
                    build_id: '142',
                    status: 'skipped',
                },
                {
                    build_id: '143',
                    status: 'failed',
                },
                {
                    build_id: '144',
                    status: 'skipped',
                },
                {
                    build_id: '145',
                    status: 'skipped',
                },
                {
                    build_id: '146',
                    status: 'skipped',
                },
                {
                    build_id: '147',
                    status: 'passed',
                },
                {
                    build_id: '148',
                    status: 'skipped',
                },
                {
                    build_id: '149',
                    status: 'skipped',
                },
                {
                    build_id: '150',
                    status: 'skipped',
                },
            ],
        },
        {
            name: 'Verify checkout process on e-commerce site',
            description:
                'User adds items to the cart, proceeds to checkout, applies a discount code, and completes the payment process.',
            test_id: 'tc_40',
            priority: 'p1',
            duration: '00:06:00',
            start_time: '1746492076',
            end_time: '1746492196',
            build_id: '123',
            build_name: 'Build 1',
            env: 'stage',
            links: [
                {
                    kane: {
                        auteur_test_id: 'mnop',
                        domain: 'https://www.ecommerce.com/',
                        description: 'KANE',
                    },
                },
                {
                    hyper_execute: {
                        job_id: 'mnop',
                        url: 'https://www.ecommerce.com/',
                        description: 'HE',
                    },
                },
                {
                    automation: {
                        automation_test_id: 'mnop',
                        url: 'https://www.ecommerce.com/',
                        description: 'ML',
                    },
                },
                {
                    sumo: {
                        test_id: 'tc_40',
                        url: 'https://service.sumologic.com/ui/#/search/create?query=_source%3Dkaneai_qa_logs%20%22{test_id}%22&startTime={startTime}000&endTime={endTime}000',
                        description: 'SUMO',
                    },
                },
            ],
            module: ['cart', 'checkout', 'payment', 'discount code', 'click'],
            result: {
                status: 'passed',
                message: 'All steps executed successfully.',
                stacktrace: [],
            },
            pre: [
                {
                    function: 'initialize_test_environment',
                    args: {
                        browser: 'chrome',
                        version: 'latest',
                        os: 'windows',
                    },
                    result: {
                        status: 'passed',
                        message: 'Test environment initialized successfully.',
                    },
                },
            ],
            steps: [
                {
                    name: 'Open e-commerce homepage',
                    uses: {
                        function: 'navigate_to_url',
                        args: {
                            url: 'https://www.ecommerce.com/',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'url_checker',
                                args: {
                                    value: 'https://www.ecommerce.com/',
                                    match: 'exact',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'E-commerce homepage opened successfully.',
                    },
                },
                {
                    name: 'Add items to the cart',
                    uses: {
                        function: 'add_to_cart',
                        args: {
                            items: ['item1', 'item2'],
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'cart_validator',
                                args: {
                                    items: ['item1', 'item2'],
                                    exists: true,
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Items added to the cart successfully.',
                    },
                },
                {
                    name: 'Proceed to checkout',
                    uses: {
                        function: 'navigate_to_checkout',
                        args: {},
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'url_checker',
                                args: {
                                    value: 'https://www.ecommerce.com/checkout',
                                    match: 'exact',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Proceeded to checkout successfully.',
                    },
                },
                {
                    name: 'Apply discount code',
                    uses: {
                        function: 'apply_discount',
                        args: {
                            code: 'DISCOUNT10',
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'discount_validator',
                                args: {
                                    code: 'DISCOUNT10',
                                    applied: true,
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Discount code applied successfully.',
                    },
                },
                {
                    name: 'Complete payment',
                    uses: {
                        function: 'process_payment',
                        args: {
                            payment_method: 'credit_card',
                            details: {
                                card_number: '4111111111111111',
                                expiry_date: '12/25',
                                cvv: '123',
                            },
                        },
                    },
                    assertions: [
                        {
                            uses: {
                                function: 'payment_validator',
                                args: {
                                    status: 'success',
                                },
                            },
                        },
                    ],
                    result: {
                        status: 'passed',
                        message: 'Payment completed successfully.',
                    },
                },
            ],
            post: [
                {
                    function: 'logout_user',
                    args: {},
                    result: {
                        status: 'passed',
                        message: 'User logged out successfully.',
                    },
                },
            ],
            history: [
                {
                    build_id: '139',
                    status: 'passed',
                },
                {
                    build_id: '140',
                    status: 'passed',
                },
                {
                    build_id: '141',
                    status: 'passed',
                },
                {
                    build_id: '142',
                    status: 'skipped',
                },
                {
                    build_id: '143',
                    status: 'passed',
                },
                {
                    build_id: '144',
                    status: 'passed',
                },
                {
                    build_id: '145',
                    status: 'passed',
                },
                {
                    build_id: '146',
                    status: 'passed',
                },
                {
                    build_id: '147',
                    status: 'passed',
                },
                {
                    build_id: '148',
                    status: 'passed',
                },
                {
                    build_id: '149',
                    status: 'passed',
                },
                {
                    build_id: '150',
                    status: 'failed',
                },
            ],
        },
    ],
    build_trends: [
        {
            build_id: '123',
            build_name: 'Build 123',
            timestamp: '2024-03-15T10:00:00Z',
            total_tests: 100,
            passed: 85,
            failed: 10,
            skipped: 5,
            duration: 3600,
            pass_rate: 85,
        },
        {
            build_id: '122',
            build_name: 'Build 122',
            timestamp: '2024-03-14T10:00:00Z',
            total_tests: 100,
            passed: 90,
            failed: 8,
            skipped: 2,
            duration: 3500,
            pass_rate: 90,
        },
        {
            build_id: '121',
            build_name: 'Build 121',
            timestamp: '2024-03-13T10:00:00Z',
            total_tests: 95,
            passed: 80,
            failed: 10,
            skipped: 5,
            duration: 3400,
            pass_rate: 84.21,
        },
        {
            build_id: '120',
            build_name: 'Build 120',
            timestamp: '2024-03-12T10:00:00Z',
            total_tests: 110,
            passed: 100,
            failed: 5,
            skipped: 5,
            duration: 4000,
            pass_rate: 90.91,
        },
        {
            build_id: '119',
            build_name: 'Build 119',
            timestamp: '2024-03-11T10:00:00Z',
            total_tests: 105,
            passed: 95,
            failed: 7,
            skipped: 3,
            duration: 3700,
            pass_rate: 90.48,
        },
        {
            build_id: '118',
            build_name: 'Build 118',
            timestamp: '2024-03-10T10:00:00Z',
            total_tests: 100,
            passed: 85,
            failed: 12,
            skipped: 3,
            duration: 3600,
            pass_rate: 85,
        },
        {
            build_id: '117',
            build_name: 'Build 117',
            timestamp: '2024-03-09T10:00:00Z',
            total_tests: 95,
            passed: 80,
            failed: 10,
            skipped: 5,
            duration: 3500,
            pass_rate: 84.21,
        },
        {
            build_id: '116',
            build_name: 'Build 116',
            timestamp: '2024-03-08T10:00:00Z',
            total_tests: 110,
            passed: 100,
            failed: 8,
            skipped: 2,
            duration: 4000,
            pass_rate: 90.91,
        },
        {
            build_id: '115',
            build_name: 'Build 115',
            timestamp: '2024-03-07T10:00:00Z',
            total_tests: 105,
            passed: 95,
            failed: 7,
            skipped: 3,
            duration: 3700,
            pass_rate: 90.48,
        },
        {
            build_id: '114',
            build_name: 'Build 114',
            timestamp: '2024-03-06T10:00:00Z',
            total_tests: 100,
            passed: 85,
            failed: 12,
            skipped: 3,
            duration: 3600,
            pass_rate: 85,
        },
        {
            build_id: '113',
            build_name: 'Build 113',
            timestamp: '2024-03-05T10:00:00Z',
            total_tests: 95,
            passed: 80,
            failed: 10,
            skipped: 5,
            duration: 3500,
            pass_rate: 84.21,
        },
        {
            build_id: '112',
            build_name: 'Build 112',
            timestamp: '2024-03-04T10:00:00Z',
            total_tests: 110,
            passed: 100,
            failed: 8,
            skipped: 2,
            duration: 4000,
            pass_rate: 90.91,
        },
        {
            build_id: '111',
            build_name: 'Build 111',
            timestamp: '2024-03-03T10:00:00Z',
            total_tests: 105,
            passed: 95,
            failed: 7,
            skipped: 3,
            duration: 3700,
            pass_rate: 90.48,
        },
        {
            build_id: '110',
            build_name: 'Build 110',
            timestamp: '2024-03-02T10:00:00Z',
            total_tests: 100,
            passed: 85,
            failed: 12,
            skipped: 3,
            duration: 3600,
            pass_rate: 85,
        },
        {
            build_id: '109',
            build_name: 'Build 109',
            timestamp: '2024-03-01T10:00:00Z',
            total_tests: 95,
            passed: 80,
            failed: 10,
            skipped: 5,
            duration: 3500,
            pass_rate: 84.21,
        },
        {
            build_id: '108',
            build_name: 'Build 108',
            timestamp: '2024-02-29T10:00:00Z',
            total_tests: 110,
            passed: 100,
            failed: 8,
            skipped: 2,
            duration: 4000,
            pass_rate: 90.91,
        },
        {
            build_id: '107',
            build_name: 'Build 107',
            timestamp: '2024-02-28T10:00:00Z',
            total_tests: 105,
            passed: 95,
            failed: 7,
            skipped: 3,
            duration: 3700,
            pass_rate: 90.48,
        },
        {
            build_id: '106',
            build_name: 'Build 106',
            timestamp: '2024-02-27T10:00:00Z',
            total_tests: 100,
            passed: 85,
            failed: 12,
            skipped: 3,
            duration: 3600,
            pass_rate: 85,
        },
        {
            build_id: '105',
            build_name: 'Build 105',
            timestamp: '2024-02-26T10:00:00Z',
            total_tests: 95,
            passed: 80,
            failed: 10,
            skipped: 5,
            duration: 3500,
            pass_rate: 84.21,
        },
        {
            build_id: '104',
            build_name: 'Build 104',
            timestamp: '2024-02-25T10:00:00Z',
            total_tests: 110,
            passed: 100,
            failed: 8,
            skipped: 2,
            duration: 4000,
            pass_rate: 90.91,
        },
        {
            build_id: '103',
            build_name: 'Build 103',
            timestamp: '2024-02-24T10:00:00Z',
            total_tests: 105,
            passed: 95,
            failed: 7,
            skipped: 3,
            duration: 3700,
            pass_rate: 90.48,
        },
        {
            build_id: '102',
            build_name: 'Build 102',
            timestamp: '2024-02-23T10:00:00Z',
            total_tests: 100,
            passed: 85,
            failed: 12,
            skipped: 3,
            duration: 3600,
            pass_rate: 85,
        },
        {
            build_id: '101',
            build_name: 'Build 101',
            timestamp: '2024-02-22T10:00:00Z',
            total_tests: 95,
            passed: 80,
            failed: 10,
            skipped: 5,
            duration: 3500,
            pass_rate: 84.21,
        },
        {
            build_id: '100',
            build_name: 'Build 100',
            timestamp: '2024-02-21T10:00:00Z',
            total_tests: 110,
            passed: 100,
            failed: 8,
            skipped: 2,
            duration: 4000,
            pass_rate: 90.91,
        },
        {
            build_id: '99',
            build_name: 'Build 99',
            timestamp: '2024-02-20T10:00:00Z',
            total_tests: 105,
            passed: 95,
            failed: 7,
            skipped: 3,
            duration: 3700,
            pass_rate: 90.48,
        },
        {
            build_id: '98',
            build_name: 'Build 98',
            timestamp: '2024-02-19T10:00:00Z',
            total_tests: 100,
            passed: 85,
            failed: 12,
            skipped: 3,
            duration: 3600,
            pass_rate: 85,
        },
        {
            build_id: '97',
            build_name: 'Build 97',
            timestamp: '2024-02-18T10:00:00Z',
            total_tests: 95,
            passed: 80,
            failed: 10,
            skipped: 5,
            duration: 3500,
            pass_rate: 84.21,
        },
        {
            build_id: '96',
            build_name: 'Build 96',
            timestamp: '2024-02-17T10:00:00Z',
            total_tests: 110,
            passed: 100,
            failed: 8,
            skipped: 2,
            duration: 4000,
            pass_rate: 90.91,
        },
        {
            build_id: '95',
            build_name: 'Build 95',
            timestamp: '2024-02-16T10:00:00Z',
            total_tests: 105,
            passed: 95,
            failed: 7,
            skipped: 3,
            duration: 3700,
            pass_rate: 90.48,
        },
    ],
};

export const mockTestData = mockData.tests;
export const mockBuildTrends = mockData.build_trends;