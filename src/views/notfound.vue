<template>
    <div>
    <h1>Désole</h1>
    <span>
    désole nous avons pas pu trouver la page démandée.
    </span>
    <a href="javacript:void(0)" class="fw-bold badge bg-info p-2" @click="$router.go(-1)">Retour</a>
    </div>
</template>
<script>
export default {
    name:'NotFound'
}
</script>
