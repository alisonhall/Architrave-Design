<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Alison K. Hall | Web Designer</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="css/normalize.css">
		<link href='http://fonts.googleapis.com/css?family=Changa+One|Open+Sans:400italic,700italic,400,700,800' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="script/fancybox/jquery.fancybox-1.3.4.css">
		<link rel="stylesheet" type="text/css" href="css/animate.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css"  href="css/main.css">
	</head>
	<body>
		<header class="clearfix">
			<a href="index.php" id="logo">
				<h1>Alison K. Hall</h1>
				<h2>Front End Web Designer and Developer</h2>
			</a>
			<nav>
				<ul class="mainNav">
					<li><a href="index.php" <?php if ($pageName=="Home") 
echo " class=\"selected\""; ?>>Portfolio</a></li>
					<li><a href="about.php" <?php if ($pageName=="About") 
echo " class=\"selected\""; ?>>About</a></li>
					<li><a href="contact.php" <?php if ($pageName=="Contact") 
echo " class=\"selected\""; ?>>Contact</a></li>
				</ul>
			</nav>
		</header>