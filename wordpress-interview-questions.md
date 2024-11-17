# WordPress Developer Interview Questions Guide

## Basic Level Questions

### WordPress Fundamentals
1. "What is the difference between WordPress posts and pages?"
2. "Explain the WordPress template hierarchy."
3. "What are hooks in WordPress? Explain the difference between actions and filters."
4. "How do you properly enqueue scripts and styles in WordPress?"
5. "What is wp_head() and why is it important?"

### Theme Development
1. "What files are essential in a WordPress theme?"
2. "Explain the purpose of functions.php."
3. "How do you create a custom page template?"
4. "What is a child theme and when should you use one?"
5. "How do you add menu support to a theme?"

### Plugin Development
1. "What is the proper way to initialize a WordPress plugin?"
2. "How do you create an activation hook?"
3. "What's the difference between plugin_dir_path() and plugin_dir_url()?"
4. "How do you add a settings page for your plugin?"
5. "Explain the WordPress Plugin API."

## Intermediate Level Questions

### Database & Queries
1. "How would you optimize this query?"
```sql
SELECT * FROM wp_posts 
JOIN wp_postmeta ON wp_posts.ID = wp_postmeta.post_id 
WHERE post_type = 'product';
```
2. "Explain the difference between get_posts(), WP_Query, and query_posts()."
3. "How do you create custom database tables in WordPress?"
4. "What are transients and when should you use them?"
5. "How do you properly prepare SQL queries in WordPress?"

### Security
1. "How do you secure AJAX calls in WordPress?"
2. "What is nonce and how do you implement it?"
3. "How do you prevent SQL injection in WordPress?"
4. "Explain proper input sanitization and validation."
5. "What security measures would you implement in a plugin?"

### Performance
1. "How do you implement caching in WordPress?"
2. "What tools do you use to diagnose performance issues?"
3. "How do you optimize WordPress database?"
4. "Explain lazy loading and how to implement it."
5. "What are your strategies for reducing page load time?"

## Advanced Level Questions

### Architecture & System Design
1. "Design a scalable WordPress multisite architecture for a franchise with 500 locations."
2. "How would you implement a custom caching system for a high-traffic WooCommerce site?"
3. "Explain your approach to implementing a real-time content synchronization system across multiple WordPress sites."
4. "Design a custom API gateway that handles 1000 requests per second."
5. "How would you architect a headless WordPress solution?"

### Technical Deep Dive
1. "Explain this code and potential issues:"
```php
add_action('init', function() {
    global $wpdb;
    $results = $wpdb->get_results("
        SELECT ID, post_title 
        FROM $wpdb->posts 
        WHERE post_status = 'publish'
    ");
    foreach($results as $result) {
        update_post_meta($result->ID, 'last_checked', time());
    }
});
```

2. "How would you optimize this function?"
```php
function get_user_posts_count($user_id) {
    $args = array(
        'author' => $user_id,
        'post_type' => 'post',
        'posts_per_page' => -1,
        'fields' => 'ids'
    );
    $query = new WP_Query($args);
    return count($query->posts);
}
```

3. "Explain potential issues with this code:"
```php
add_filter('the_content', function($content) {
    if(is_single()) {
        $related = get_posts(array(
            'posts_per_page' => 5,
            'category__in' => wp_get_post_categories(get_the_ID())
        ));
        foreach($related as $post) {
            $content .= '<p>' . $post->post_title . '</p>';
        }
    }
    return $content;
});
```

### Problem-Solving Scenarios

#### Scenario 1: Performance Issue
"A WordPress site is taking 8 seconds to load. Walk me through your debugging process."

Expected discussion points:
- Server-side profiling
- Database query analysis
- Caching implementation
- Asset optimization
- External service dependencies

#### Scenario 2: Security Breach
"A client's site was hacked. What steps would you take to:
1. Identify the vulnerability
2. Clean the site
3. Prevent future attacks"

#### Scenario 3: Scalability
"A WooCommerce site with 100,000 products is slow. How would you optimize it?"

### WooCommerce Specific Questions
1. "How do you implement a custom payment gateway?"
2. "Explain the WooCommerce hook system."
3. "How would you handle custom product types?"
4. "Explain WooCommerce's order processing flow."
5. "How do you implement custom shipping calculations?"

## Situational Questions

### Project Management
1. "How do you handle urgent production issues?"
2. "Describe your deployment workflow."
3. "How do you manage plugin updates in a production environment?"
4. "What's your approach to code review?"
5. "How do you handle technical debt?"

### Client Interaction
1. "How do you explain technical concepts to non-technical clients?"
2. "How do you handle scope creep?"
3. "Describe a difficult client situation and how you resolved it."
4. "How do you document your work for clients?"
5. "How do you handle emergency after-hours support?"

## Practical Test Questions

### Code Writing Tasks
1. "Create a custom shortcode that displays posts with specific criteria."
2. "Write a function to automatically resize images on upload."
3. "Create a custom REST API endpoint with authentication."
4. "Implement a custom Gutenberg block."
5. "Create a custom WordPress CLI command."

### Debugging Tasks
1. "Find and fix the performance issue in this code:"
```php
function get_all_users_data() {
    $users = get_users();
    foreach($users as $user) {
        $posts = get_posts(array('author' => $user->ID));
        $meta = get_user_meta($user->ID);
        // Process data
    }
}
```

2. "Identify security issues in this code:"
```php
add_action('wp_ajax_save_user_data', function() {
    $user_id = $_POST['user_id'];
    $meta = $_POST['meta'];
    update_user_meta($user_id, 'custom_data', $meta);
    echo 'Saved';
    die();
});
```

## Red Flag Responses
Watch out for candidates who:
1. Don't mention security when discussing AJAX
2. Suggest using query_posts()
3. Don't understand WordPress coding standards
4. Can't explain basic hooks system
5. Show no concern for performance implications
6. Don't follow WordPress naming conventions
7. Can't explain their problem-solving process
8. Don't consider scalability in their solutions

## Evaluation Criteria
Score candidates based on:
1. Technical knowledge (1-10)
2. Problem-solving ability (1-10)
3. Code quality awareness (1-10)
4. Security consciousness (1-10)
5. Performance optimization skills (1-10)
6. Communication skills (1-10)
7. Best practices awareness (1-10)
8. Experience level demonstrated (1-10)

## Follow-up Questions
Always ask:
1. "Can you explain your thinking process?"
2. "What alternatives did you consider?"
3. "How would you improve this solution?"
4. "What potential issues might arise?"
5. "How would you test this?"

Remember to:
- Allow time for thinking
- Observe problem-solving approach
- Look for security awareness
- Check for performance consideration
- Assess code organization
- Evaluate documentation habits
- Consider maintainability focus
- Watch communication style

