<?php
   require 'functions/bdd.php';
   require 'functions/main_functions.php';
   require 'jointures/header.php';
   require 'jointures/body.php';

    // verification du formulaire
   if (isset($_POST['connexion']) && !empty($_POST['identifiant']) && !empty($_POST['password'])) {
     	
      // Communication avec la bdd
     	$req = $bdd->prepare('select * from membres where identifiant = :pseudo');
     	$req->execute([":pseudo" => htmlspecialchars($_POST['identifiant'])]);
     	$data = $req->fetch();
     	
     	// si un résultat -> continuer
     	if ($data) {
     		
         // si le mdp est bon -> connection
     		if (password_verify($_POST['password'], $data['password'])) {
     			$_SESSION['identifiant'] = $data['identifiant'];
     			$_SESSION['groupe'] = $data["groupe"];
            $_SESSION['isAdmin'] = $data["isAdmin"];
     			$message = "Connexion effectuée avec succès";
     		}else{
     			$message = "Mot de passe invalide";
     		}
     	}else{
     		$message = "Aucun utilisateur trouvé"; 
     	}
   }
?>

<?php if(isset($message)){?>

	<div class="alert">
	 	<!-- Equivalent de echo <\?= est = à <\?php echo "mon msg"; ?> -->
	 	<?= $message ?>
	</div>

<?php } ?>

<form method="post">
   <div><!--Centré-->
      <div class="Formulaire">
         <p face="Optima, sans-serif">
            <h2>Connexion</h2>
         </p>
         <input type="text" name="identifiant" placeholder=" Votre identifiant" class="Form" required>
         <input type="password" name="password" placeholder=" Votre mot de passe" class="Form" required>
         <input type="submit" name="connexion" value="Se connecter" class="Envoyer">
      </div>
    </div>
</form>

<?php
include 'jointures/footer.php';
?>