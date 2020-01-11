<?php

class SkillTableSeeder extends Seeder {

    public function run(){
    	DB::table('skills')->delete();

    	$tab = array(
    		'Android',
    		'Angular',
    		'C',
    		'C#',
    		'C++',
    		'CakePHP',
    		'Cassandra',
    		'CSS',
    		'Django',
    		'Dovecot', 
    		'Drupal', 
    		'Excel', 
    		'Go', 
    		'GSuite', 
    		'HTML', 
    		'iOS', 
    		'Java', 
    		'JavaScript', 
    		'Joomla', 
    		'Libre', 
    		'MariaDB', 
    		'MongoDB', 
    		'MySQL', 
    		'.NET', 
    		'NGINX', 
    		'Node.js', 
    		'Objective-C', 
    		'Phonegap', 
    		'Photoshop', 
    		'PHP', 
    		'Postfix', 
    		'PostgreSQL', 
    		'Prestashop', 
    		'Python', 
    		'React.js', 
    		'Redis', 
    		'Ruby', 
    		'Swift', 
    		'Vue.js', 
    		'Webpack', 
    		'WordPress');

    	foreach ($tab as $elt) {
    		$skills = array(
				array(
		            'name'          => $elt
		        )
	    	);
	    	DB::table('skills')->insert($skills);
    	}
    }
}

?>